import React, { useState, useEffect } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("00:00");
  const [currentEdit, setCurrentEdit] = useState(null);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost/Prakse/Homeifye/to_do/todo_backend/get_todos.php");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (currentEdit) {
      handleUpdateTodo();
      return;
    }

    const newTodo = { title: newTitle, description: newDescription, date: newDate, time: newTime };
    try {
      const response = await fetch("http://localhost/Prakse/Homeifye/to_do/todo_backend/add_todo.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });
      const result = await response.json();
      if (result.success) {
        fetchTodos();
        resetForm();
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleUpdateTodo = async () => {
    const updatedTodo = {
      id: currentEdit,
      title: newTitle,
      description: newDescription,
      date: newDate,
      time: newTime,
    };

    try {
      const response = await fetch("http://localhost/Prakse/Homeifye/to_do/todo_backend/update_todo.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo),
      });
      const result = await response.json();
      if (result.success) {
        fetchTodos();
        resetForm();
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleEdit = (id, todo) => {
    setCurrentEdit(id);
    setNewTitle(todo.title);
    setNewDescription(todo.description);
    setNewDate(todo.date);
    setNewTime(todo.time);
  };

  const resetForm = () => {
    setNewTitle("");
    setNewDescription("");
    setNewDate("");
    setNewTime("00:00");
    setCurrentEdit(null);
  };

  const handleDeleteTodo = async (id) => {
    try {
      const response = await fetch("http://localhost/Prakse/Homeifye/to_do/todo_backend/delete_todo.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const result = await response.json();
      if (result.success) fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleComplete = async (id) => {
    try {
      const response = await fetch("http://localhost/Prakse/Homeifye/to_do/todo_backend/complete_todo.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const result = await response.json();
      if (result.success) fetchTodos();
    } catch (error) {
      console.error("Error completing todo:", error);
    }
  };

  // Group todos by date and sort them
  const groupedTodos = allTodos.reduce((acc, todo) => {
    const dateKey = todo.date || "No Date";
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(todo);
    return acc;
  }, {});

  const sortedDateKeys = Object.keys(groupedTodos).sort((a, b) => new Date(a) - new Date(b));

  const sortTasks = (tasks) => {
    return tasks.sort((a, b) => {
      if (a.completed_on && !b.completed_on) return 1;
      if (!a.completed_on && b.completed_on) return -1;
      return a.time.localeCompare(b.time);
    });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "No Date";
    const dateObj = new Date(dateStr);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("en-US", { month: "long" });
    const weekday = dateObj.toLocaleString("en-US", { weekday: "long" });
    return `${day} ${month}, ${weekday}`;
  };

  return (
    <div className="App">
      <h1>My Todos</h1>
      <TodoForm
        newTitle={newTitle}
        newDate={newDate}
        newTime={newTime}
        setNewTitle={setNewTitle}
        setNewDate={setNewDate}
        setNewTime={setNewTime}
        handleAddTodo={handleAddTodo}
        currentEdit={currentEdit}
      />

      <TodoList
        grouped={groupedTodos}
        sortedDateKeys={sortedDateKeys}
        formatDate={formatDate}
        sortTasks={sortTasks}
        handleEdit={handleEdit}
        handleDeleteTodo={handleDeleteTodo}
        handleComplete={handleComplete}
      />
    </div>
  );
}

export default App;
