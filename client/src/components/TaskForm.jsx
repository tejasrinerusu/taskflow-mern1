import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

function TaskForm({ onTaskCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Todo",
    priority: "Medium",
    dueDate: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setError("Please enter a task title.");
      return;
    }

    try {
      setError("");

      const response = await axios.post(API_URL, formData);

      onTaskCreated(response.data);

      setFormData({
        title: "",
        description: "",
        status: "Todo",
        priority: "Medium",
        dueDate: "",
      });
    } catch (error) {
      console.error("Create task error:", error);

      if (error.response) {
        setError(
          error.response.data?.error ||
            error.response.data?.message ||
            "Failed to create task."
        );
      } else {
        setError("Cannot connect to the backend server.");
      }
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <div>
          <h2>Add New Task</h2>
          <p>Create a task and keep your work organized.</p>
        </div>
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="form-group">
        <label htmlFor="title">Task Title</label>
        <input
          id="title"
          type="text"
          name="title"
          placeholder="e.g. Complete MERN assessment"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Add some details about this task..."
          value={formData.description}
          onChange={handleChange}
          rows="3"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Status</label>

          <div className="option-group">
            {["Todo", "In Progress", "Completed"].map((status) => (
              <button
                key={status}
                type="button"
                className={`option-button ${
                  formData.status === status ? "selected" : ""
                }`}
                onClick={() =>
                  setFormData({
                    ...formData,
                    status,
                  })
                }
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Priority</label>

          <div className="option-group">
            {["Low", "Medium", "High"].map((priority) => (
              <button
                key={priority}
                type="button"
                className={`option-button priority-option priority-${priority.toLowerCase()} ${
                  formData.priority === priority ? "selected" : ""
                }`}
                onClick={() =>
                  setFormData({
                    ...formData,
                    priority,
                  })
                }
              >
                {priority}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="dueDate">Due Date</label>
        <input
          id="dueDate"
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="add-task-button">
        + Add Task
      </button>
    </form>
  );
}

export default TaskForm;