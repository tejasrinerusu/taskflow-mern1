# TaskFlow – MERN Task Management System

TaskFlow is a full-stack task management application built with the MERN stack. It allows users to create, view, edit, update, filter, search, and delete tasks while storing task data in MongoDB.

## Features

* Create tasks with title, description, status, priority, and due date
* View tasks stored in MongoDB
* Edit existing tasks
* Update task status directly from the task card
* Delete tasks with confirmation
* Search tasks by title or description
* Filter tasks by status and priority
* Dashboard statistics for total, Todo, In Progress, and Completed tasks
* Form validation and clear error messages
* Responsive and interactive UI
* RESTful backend API with Express.js and Mongoose
* MongoDB persistence through MongoDB Atlas

## Technologies

### Frontend

* React.js
* Vite
* Axios
* CSS

### Backend

* Node.js
* Express.js
* Mongoose
* REST API
* CORS
* dotenv

### Database

* MongoDB Atlas

### Development Tools

* Git and GitHub
* Kiro
* VS Code

## Project Structure

```text
taskflow-mern/
├── client/
│   └── src/
│       ├── components/
│       │   ├── TaskCard.jsx
│       │   └── TaskForm.jsx
│       ├── App.jsx
│       ├── App.css
│       └── main.jsx
│
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── taskController.js
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## API Endpoints

| Method | Endpoint         | Description      |
| ------ | ---------------- | ---------------- |
| POST   | `/api/tasks`     | Create a task    |
| GET    | `/api/tasks`     | Get all tasks    |
| GET    | `/api/tasks/:id` | Get a task by ID |
| PUT    | `/api/tasks/:id` | Update a task    |
| DELETE | `/api/tasks/:id` | Delete a task    |

## Setup and Installation

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* MongoDB Atlas account
* Git

### 1. Clone the repository

```bash
git clone https://github.com/tejasrinerusu/taskflow-mern1.git
cd taskflow-mern1
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `server` folder:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Do not commit the `.env` file because it contains environment-specific configuration and secrets.

### 4. Install frontend dependencies

Open another terminal:

```bash
cd client
npm install
```

## How to Run

### Start the backend

From the `server` folder:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### Start the frontend

From the `client` folder:

```bash
npm run dev
```

The frontend runs on the Vite development URL shown in the terminal, normally:

```text
http://localhost:5173
```

Open the frontend URL in a browser to use TaskFlow.

## MongoDB

TaskFlow uses MongoDB Atlas for persistent task storage. Mongoose connects the Express backend to MongoDB using the `MONGO_URI` environment variable.

The Task model contains:

* `title`
* `description`
* `status`
* `priority`
* `dueDate`
* `createdAt`
* `updatedAt`

## AI Development Experience – Kiro

Kiro was used as the AI development tool during the project. The AI was used as a development assistant while the application was implemented and tested manually.

### AI-assisted tasks

1. **Project code review** – Kiro reviewed the TaskFlow structure, including the React frontend, Express API, MongoDB/Mongoose integration, CRUD operations, search/filter functionality, and UI. It identified areas for validation, security, error handling, and API configuration improvements.

2. **Backend API validation and security** – Kiro assisted with improving the task controller by whitelisting supported task fields before create/update operations, using Mongoose `runValidators: true`, using `$set` for updates, and returning JSON error messages.

3. **Backend update debugging** – During testing, an update implementation caused a JavaScript syntax error and also required careful handling of partial updates because the frontend sends only the changed status for status updates. The implementation was corrected and the CRUD flows were retested.

4. **Code quality improvement** – Kiro's review was used to identify improvements such as better request-field handling, validation, CORS configuration, centralized API configuration, and user-visible error handling.

5. **Development documentation** – Kiro's project review was used to understand and document the frontend/backend architecture and development decisions in this README.

### AI usage approach

Kiro was used to review, explain, and improve parts of the codebase rather than blindly generating the complete application. Changes were reviewed, tested locally, and corrected when necessary. The application was manually tested after backend changes to verify create, read, update, status update, priority update, and delete functionality.

## Testing

The following functionality was manually tested:

* Creating a task
* Loading tasks from MongoDB
* Editing task details
* Changing task status
* Changing task priority
* Searching tasks
* Filtering by status
* Filtering by priority
* Deleting tasks
* Verifying data persistence in MongoDB
* Verifying frontend-to-backend API communication

## Security and Configuration Notes

* MongoDB credentials are stored in `.env` and excluded from Git.
* Backend task creation and updates accept only supported task fields.
* Mongoose validation is enabled for task updates.
* API errors are returned as JSON responses.

## Future Improvements

* User authentication and authorization
* Server-side search and filtering
* Centralized frontend API configuration using environment variables
* Production deployment
* Automated unit and integration tests
* Improved API error middleware

## Author

Teja Sri Nerusu

GitHub: https://github.com/tejasrinerusu
