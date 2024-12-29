# To-Do List Application

## 1. Executive Summary

The **To-Do List Application** is a comprehensive task management tool designed to enhance productivity by enabling users to manage their tasks effectively. This web-based application features the following:

- **Task Management**: Add and delete tasks with ease.
- **Task Prioritization**: Assign priority levels to tasks for better organization.
- **Responsive Design**: Intuitive user interface built with Cloudscape Design System.
- **Backend Integration**: Powered by a robust Node.js and Express backend with MongoDB for data storage.
- **Soft Deletion**: Tasks marked as "deleted" are retained in the database but hidden from active views.

This project is ideal for demonstrating modern full-stack web development practices, utilizing React on the frontend and Node.js on the backend.

---

## 2. How to Run

Follow these steps to run the application locally:

### Prerequisites
- **Node.js** and **npm** installed
- **MongoDB** installed and running locally or a MongoDB Atlas connection string
- **Git** installed

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/omer-sade/to-do-list.git
   cd to-do-list
   ```

2. **Install Dependencies**:
   - Navigate to the backend folder and install dependencies:
     ```bash
     cd server
     npm install
     ```
   - Navigate to the frontend folder and install dependencies:
     ```bash
     cd ../client
     npm install
     ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the `server` directory with the following variables:
     ```env
     MONGO_URI=<your-mongodb-connection-string>
     PORT=5000
     ```

4. **Run the Application**:
   - Start the backend server:
     ```bash
     cd server
     npm start
     ```
   - Start the frontend:
     ```bash
     cd ../client
     npm start
     ```

5. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000`.

---

## 3. Dive Deep

### Code Structure

The project is structured into two main directories: `client` (frontend) and `server` (backend).

#### **Frontend (Client)**
- **`src/components`**: Contains reusable React components, such as `MainTable` for displaying tasks.
- **`src/constants`**: Holds constants like task templates and utility functions.
- **`src/App.js`**: The main application file containing core logic for task management.

#### **Backend (Server)**
- **`server/routes/taskRoutes.js`**: Defines API endpoints for tasks, including creation, retrieval, updating, and soft deletion.
- **`server/models/Task.js`**: MongoDB schema for tasks, defining fields and validation rules.
- **`server/index.js`**: Entry point for the backend server, sets up routes and connects to MongoDB.

#### Key Features in Code
- **Soft Deletion**: Implemented using a `PUT` route to update `status_id` to 5 without removing the task from the database.
- **Dynamic Filtering**: The frontend automatically excludes deleted tasks from being displayed.
- **Centralized Utility Functions**: Parsing and filtering logic is handled in the `utils` directory for modularity and reusability.

This structure ensures scalability, maintainability, and clear separation of concerns, making it easy to extend the application with new features in the future.

---

