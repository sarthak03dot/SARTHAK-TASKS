import { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/tasks",
        task
      );
      setTasks([response.data, ...tasks]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        updatedTask
      );
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
      setEditingTask(null);
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this task?"
      );
      if (!confirmDelete) return;
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const startEditing = (task) => {
    setEditingTask(task);
  };

  return (
    <div className="min-h-screen bg-gray-200 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Task Managing Platform</h1>
        <TaskForm
          addTask={addTask}
          updateTask={updateTask}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
        />
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          startEditing={startEditing}
        />
      </div>
    </div>
  );
}

export default App;
