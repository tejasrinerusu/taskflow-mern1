import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

function TaskCard({ task, onTaskUpdated, onTaskDeleted }) {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description || "",
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate
      ? task.dueDate.split("T")[0]
      : "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleStatusChange = async (event) => {
    try {
      const response = await axios.put(`${API_URL}/${task._id}`, {
        status: event.target.value,
      });

      onTaskUpdated(response.data);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      setError("");

      const response = await axios.put(
        `${API_URL}/${task._id}`,
        formData
      );

      onTaskUpdated(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update task:", error);
      setError("Failed to update task.");
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/${task._id}`);

      onTaskDeleted(task._id);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  if (isEditing) {
    return (
      <article className="task-card">
        <form onSubmit={handleSave}>
          <h3>Edit Task</h3>

          {error && <p className="form-error">{error}</p>}

          <input
            className="edit-input"
            type="text"
            name="title"
            placeholder="Task title"
            value={formData.title}
            onChange={handleChange}
          />

          <textarea
            className="edit-input"
            name="description"
            placeholder="Task description"
            value={formData.description}
            onChange={handleChange}
          />

          <select
            className="edit-input"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            className="edit-input"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <input
            className="edit-input"
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />

          <div className="edit-actions">
            <button type="submit" className="save-button">
              Save Changes
            </button>

            <button
              type="button"
              className="cancel-button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </article>
    );
  }

  return (
    <article className="task-card">
      <div className="task-card-top">
        <h3>{task.title}</h3>

        <span
          className={`priority priority-${task.priority.toLowerCase()}`}
        >
          {task.priority}
        </span>
      </div>

      <p className="description">
        {task.description || "No description provided."}
      </p>

      <div className="task-details">
        <select
          value={task.status}
          onChange={handleStatusChange}
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        {task.dueDate && (
          <span>
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="task-actions">
        <button
          className="edit-button"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>

        <button
          className="delete-button"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskCard;