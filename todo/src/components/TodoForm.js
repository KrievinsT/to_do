import React from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

function TodoForm({
  newTitle,
  newDate,
  newTime,
  setNewTitle,
  setNewDate,
  setNewTime,
  handleAddTodo,
  currentEdit,
}) {
  return (
    <div className="todo-form">
      <div className="form-item">
        <label>Title</label>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Task Title"
          className="form-input"
        />
      </div>
      <div className="form-item">
        <label>Date</label>
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-item">
        <label>Time</label>
        <TimePicker
          onChange={setNewTime}
          value={newTime}
          format="HH:mm"
          disableClock={true}
          className="form-input"
        />
      </div>
      <button type="button" onClick={handleAddTodo} className="form-submit-btn">
        {currentEdit ? "Edit Task" : "Add Task"}
      </button>
    </div>
  );
}

export default TodoForm;
