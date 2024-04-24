import React, { useState } from "react";
import "./create.css";

const Create = ({ addTask }) => {
  const [task, setTask] = useState();

  const handleAdd = async () => {
    if (task.trim() !== "") {
      await addTask(task);
      setTask("");
    }
    // setTimeout(() => {
    //   setTask("");
    // }, 2000);
  };

  return (
    <div className="create-container">
      <input
        type="text"
        className="create-input"
        placeholder="Enter Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button
        className="create-btn"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
};

export default Create;
