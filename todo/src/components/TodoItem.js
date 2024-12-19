import React, { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { FaEllipsisH } from "react-icons/fa";

function TodoItem({ item, handleEdit, handleDeleteTodo, handleComplete }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={`task-item ${item.completed_on ? "completed" : ""}`}>
      <div className="task-info">
        <div className="task-time">{item.time.slice(0, 5)}</div> {/* Time */}
        <div className="task-title">{item.title}</div> {/* Title */}
      </div>
      <div className="task-actions">
        <div className="action-button" onClick={() => setMenuOpen(!menuOpen)}>
          <FaEllipsisH />
        </div>
        {menuOpen && (
          <div className="menu-content">
            {!item.completed_on && (
              <>
                <div
                  className="action-button"
                  onClick={() => handleComplete(item.id)}
                >
                  <BsCheckLg />
                </div>
                <div
                  className="action-button"
                  onClick={() => handleEdit(item.id, item)}
                >
                  <AiOutlineEdit />
                </div>
              </>
            )}
            <div
              className="action-button"
              onClick={() => handleDeleteTodo(item.id)}
            >
              <AiOutlineDelete />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoItem;
