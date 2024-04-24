import React, { useState } from "react";
import "./auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios-config";

const Signup = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };
  const register = async () => {
    const { data } = await axios
      .post(`/user/register`, {
        name: form.name,
        email: form.email,
        password: form.password,
      })
      .catch((err) => {
        console.log(`error sending data : ${err}`);
      });
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    register().then(() => navigate("/"));
  };

  return (
    <div className="formCo">
      <form
        className="form"
        onSubmit={handleSubmit}
      >
        <p className="title">Register </p>
        <p className="message">Signup now and get full access to our app. </p>
        <div >
          <label>
            <input
              required
              type="text"
              className="input"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <span>Name</span>
          </label>
        </div>

        <label>
          <input
            required
            type="email"
            className="input"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <span>Email</span>
        </label>

        <label>
          {visible ? (
            <FaEye
              className="eye"
              onClick={() => setVisible(false)}
            />
          ) : (
            <FaEyeSlash
              className="eye"
              onClick={() => setVisible(true)}
            />
          )}
          <input
            required
            type={visible ? "text" : "password"}
            className="input"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <span>Password</span>
        </label>

        <button className="submit">Submit</button>
        <p className="signin">
          Already have an acount ? <Link to="/">Signin</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
