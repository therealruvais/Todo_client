import React, { useState } from "react";
import "./auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios-config";

const Login = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const [form, setForm] = useState({ email: "", password: "" });
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/user/login`, {
        email: form.email,
        password: form.password,
      });
      console.log(data.msg);
      if (data.msg === "success") {
        navigate("/home");
      }
    } catch (err) {
      console.log(`Error logging in: ${err}`);
    }
  };

  return (
    <div className="formCo">
      <form
        className="form"
        onSubmit={handleSubmit}
      >
        <p className="title">Login </p>
        <p className="message">Login and get full access to our app. </p>
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
          Don't have an acount ? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
