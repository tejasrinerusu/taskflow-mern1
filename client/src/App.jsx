import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";
import "./App.css";

const API_URL = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskCreated = (newTask) => {
    setTasks((currentTasks) => [newTask, ...currentTasks]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  };

  const handleTaskDeleted = (deletedTaskId) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task._id !== deletedTaskId)
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      task.title.toLowerCase().includes(searchText) ||
      (task.description || "").toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>TaskFlow</h1>
          <p>Manage your tasks. Stay productive.</p>
        </div>

        <div className="header-badge">MERN</div>
      </header>

      <main className="container">
        {/* Dashboard Statistics */}
        <section className="stats">
          <div className="stat-card">
            <span>Total Tasks</span>
            <strong>{tasks.length}</strong>
          </div>

          <div className="stat-card">
            <span>Todo</span>
            <strong>
              {tasks.filter((task) => task.status === "Todo").length}
            </strong>
          </div>

          <div className="stat-card">
            <span>In Progress</span>
            <strong>
              {tasks.filter((task) => task.status === "In Progress").length}
            </strong>
          </div>

          <div className="stat-card">
            <span>Completed</span>
            <strong>
              {tasks.filter((task) => task.status === "Completed").length}
            </strong>
          </div>
        </section>

        {/* Add Task */}
        <section className="form-section">
          <TaskForm onTaskCreated={handleTaskCreated} />
        </section>

        {/* Tasks */}
        <section className="tasks-section">
          <div className="section-heading">
            <div>
              <h2>Your Tasks</h2>
              <p>Keep track of your work and priorities.</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="filters">
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(event) => setPriorityFilter(event.target.value)}
            >
              <option value="All">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {loading ? (
            <div className="empty-state">
              <p>Loading tasks...</p>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="empty-state">
              <h3>No matching tasks</h3>
              <p>Try changing your search or filters.</p>
            </div>
          ) : (
            <div className="task-grid">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onTaskUpdated={handleTaskUpdated}
                  onTaskDeleted={handleTaskDeleted}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;