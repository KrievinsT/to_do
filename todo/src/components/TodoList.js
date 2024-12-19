import React from "react";
import TodoItem from "./TodoItem";

function TodoList({
  grouped,
  sortedDateKeys,
  formatDate,
  sortTasks,
  handleEdit,
  handleDeleteTodo,
  handleComplete,
}) {
  return (
    <div className="card-container">
      {sortedDateKeys.map((dateKey) => (
        <div key={dateKey} className="date-card">
          <div className="date-card-header">{formatDate(dateKey)}</div>
          <div className="tasks-container">
            {sortTasks(grouped[dateKey]).map((todo) => (
              <TodoItem
                key={todo.id}
                item={todo}
                handleEdit={handleEdit}
                handleDeleteTodo={handleDeleteTodo}
                handleComplete={handleComplete}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
