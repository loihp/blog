import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../Component/utils/notification/Notification";
import { dispatchLogin } from "../redux/actions/authAction";
import { useDispatch } from "react-redux";
const initialState = {
  email: "",
  password: "",
  err: " ",
  success: "",
};

export default function Login() {
  const [user, setUser] = useState(initialState);
  const { email, password, err, success } = user;
  const dispatch = useDispatch();
  const history = useHistory();
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const responseFacebook = async (response) => {
    try {
      const { accessToken, userID } = response;
      const res = await axios.post("/user/facebook_login", {
        accessToken,
        userID,
      });

      setUser({ ...user, error: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      history.push("/");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };
  const responseGoogle = async (response) => {
    try {
      const res = await axios.post("/user/google_login", {
        tokenId: response.tokenId,
      });

      setUser({ ...user, error: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      history.push("/");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/login", { email, password });
      setUser({ ...user, err: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);
      dispatch(dispatchLogin());
      history.push("/");
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
          <h2>Sign In With</h2>
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}

          <div className="social">
            <GoogleLogin
              clientId="575102538088-tav4nq7lg1uas9ijqe5hbvqof2t74p3p.apps.googleusercontent.com"
              buttonText="Login With Google"
              onSuccess={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
            <FacebookLogin
              appId="370759520678652"
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook}
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
            <Link to="/forgot_password">Forgot your password</Link>
          </div>

          <div className="row">
            <button type="submit" className="submit">
              Sign In
            </button>
          </div>
        </form>
        <p>
          New Customer? <Link to="/register">Register</Link>{" "}
        </p>
      </div>
    </div>
  );
}
