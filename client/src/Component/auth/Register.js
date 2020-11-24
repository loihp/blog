import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { showErrMsg, showSuccessMsg } from "../utils/notification/Notification";
import {
  isMatch,
  isEmail,
  isEmpty,
  isLength,
} from "../utils/validation/Validation";
const initialState = {
  name: "",
  email: "",
  password: "",
  cf_password: "",
  err: " ",
  success: "",
};

export default function Register() {
  const [user, setUser] = useState(initialState);
  const { name, email, password, cf_password, err, success } = user;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(name) || isEmpty(password)) {
      return setUser({
        ...user,
        err: "Please fill in all fields.",
        success: "",
      });
    }
    if (!isEmail(email)) {
      return setUser({
        ...user,
        err: "Invalid emails.",
        success: "",
      });
    }
    if (!isLength(password)) {
      return setUser({
        ...user,
        err: "Password must be at least 6 characters",
        success: "",
      });
    }
    if (!isMatch(password, cf_password)) {
      return setUser({
        ...user,
        err: "Password did not match.",
        success: "",
      });
    }
    try {
      const res = await axios.post("/user/register", {
        name,
        email,
        password,
      });
      setUser({
        ...user,
        err: " ",
        success: res.data.msg,
      });
    } catch (err) {
      err.response.data.msg &&
        setUser({
          ...user,
          err: err.response.data.msg,
          success: "",
        });
    }
  };
  return (
    <div className="container">
      <div className="container login">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}

          {/* <div className="type">
            <button id="fb">Facebook</button>
            <button id="gg">Google</button>
          </div> */}
          <div className="fill">
            <label htmlFor="name">User Name</label>
            <input
              type="text"
              id="name"
              value={name}
              name="name"
              onChange={handleChangeInput}
            />
          </div>

          <div className="fill">
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              id="email"
              value={email}
              name="email"
              onChange={handleChangeInput}
            />
          </div>

          <div className="fill">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              onChange={handleChangeInput}
              value={password}
              name="password"
            />
          </div>
          <div className="fill">
            <label htmlFor="cf_password">Confirm Password</label>
            <input
              type="text"
              id="cf_password"
              onChange={handleChangeInput}
              value={cf_password}
              name="cf_password"
            />
          </div>

          <div className="row">
            <button type="submit" className="submit">
              Sign In
            </button>
          </div>
        </form>
        <p>
          Already an account? <Link to="/login">Login</Link>{" "}
        </p>
      </div>
    </div>
  );
}
