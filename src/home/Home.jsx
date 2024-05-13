import React, { useContext, useEffect, useState } from "react";
import Create from "../components/Create";
import "./home.css";
import axios from "../axios-config";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { UserDataContext } from "../context/UserDataContext";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const { userData, setUserData } = useContext(UserDataContext);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState("");

  const navigate = useNavigate();

  const user = async () => {
    try {
      const response = await axios.get(`/user/verify`, {
        withCredentials: true,
      });
      console.log("Response:", response);
      const data = response.data;
      setUserData(data.getaUser);
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    user();
  }, []);

  const logOut = async () => {
    const { data } = await axios
      .post(`/user/logout`)
      .catch((err) => console.log("error logging Out", err));
    console.log(data.msg);
    return data;
  };

  const handleLogout = () => {
    logOut().then(() => navigate("/"));
  };

  useEffect(() => {
    axios
      .get(`/task/tasks/`)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []);

  const addTask = async (newTask) => {
    try {
      const response = await axios.post(`/task/create`, {
        name: newTask,
        user: userData._id,
      });
      if (response && response.data) {
        const updatedTodos = [...todos, response.data];
        setTodos(updatedTodos);
        console.log(response.data.msg);
      } else {
        console.log("No data received from server");
      }
    } catch (error) {
      console.log("Error adding task:", error);
    }
  };

  const handleEdit = (id, currentName) => {
    setEditingTaskId(id);
    setEditedTaskName(currentName);
  };

  const handleTaskNameChange = (event) => {
    setEditedTaskName(event.target.value);
  };

  const handleTaskNameUpdate = (id) => {
    axios
      .put(`/task/${id}`, { name: editedTaskName })
      .then((response) => {
        const updatedTodos = todos.map((todo) =>
          todo._id === id ? response.data : todo
        );
        setTodos(updatedTodos);
        setEditingTaskId(null);
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  const handleTaskCompletion = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo._id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(updatedTodos);

    try {
      axios.put(`/task/${id}`, {
        completed: !todos.find((todo) => todo._id === id).completed,
      });
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      axios
        .delete(`/task/${id}`)
        .then(() => {
          const updatedTodos = todos.filter((todo) => todo._id !== id);
          setTodos(updatedTodos);
        })
        .catch((error) => {
          console.error("Error deleting task:", error);
        });
    }
  };

  return (
    <div className="container">
      <div className="nav">
        <button
          className="create-btn"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
      <div className="todo">
        <h1>To Do List</h1>
        <Create addTask={addTask} />
      </div>
      {todos.length === 0 ? (
        <div>
          <h2>No Task</h2>
        </div>
      ) : (
        todos.map((todo, index) => (
          <div
            className="task-list"
            key={index}
          >
            <div className="list">
              <input
                type="checkbox"
                name=""
                className="check"
                checked={todo.completed}
                onChange={() => handleTaskCompletion(todo._id)}
              />
              {editingTaskId === todo._id ? (
                <input
                  type="text"
                  value={editedTaskName}
                  onChange={handleTaskNameChange}
                />
              ) : (
                <p
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                  className="tasks"
                >
                  {todo.name}
                </p>
              )}
            </div>
            <div className="update">
              {editingTaskId === todo._id ? (
                <button onClick={() => handleTaskNameUpdate(todo._id)}>
                  Update
                </button>
              ) : (
                <FaEdit
                  className="edit"
                  onClick={() => handleEdit(todo._id, todo.name)}
                />
              )}
              <RiDeleteBin6Line
                className="delete"
                onClick={() => handleDelete(todo._id)}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
