import React, { useEffect } from "react";
import Navigation from "./Component/navigation";
import Footer from "./Component/footer";
import Home from "./pages/home";
import Login from "./pages/login";
import NotFound from "./Component/utils/NotFound/NotFound";
import {
  dispatchLogin,
  fetchUser,
  dispatchGetuser,
} from "./redux/actions/authAction";

// import Blog from "./pages/blog";
// import ContactUs from "./pages/contact-us";
import Register from "./Component/auth/Register";
import EditUser from "./pages/profile/EditUser";
import ActivationEmail from "./Component/auth/ActivationEmail";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ForgotPassword from "./Component/auth/ForgotPassword";
import ResetPassword from "./Component/auth/ResetPassword";
import Profile from "./pages/profile/Profile";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin } = auth;
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const getToken = async () => {
        const res = await axios.post("/user/refresh_token", null);
        dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
      };
      getToken();
    }
  }, [auth.isLogged, dispatch]);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());

        return fetchUser(token).then((res) => {
          dispatch(dispatchGetuser(res));
        });
      };
      getUser();
    }
  }, [token, dispatch]);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Navigation />
            <Home />
            <Footer />
          </Route>
          <Route path="/home" exact>
            <Navigation />
            <Home />
            <Footer />
          </Route>
        </Switch>

        <Switch>
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route
            path="user/activate/:activation_token"
            component={ActivationEmail}
            exact
          />
          <Route
            path="/forgot_password"
            component={isLogged ? NotFound : ForgotPassword}
            exact
          />
          <Route
            path="user/reset/:token"
            component={isLogged ? NotFound : ResetPassword}
            exact
          />
        </Switch>
        <Switch>
          <Route
            path="/profile"
            component={isLogged ? Profile : NotFound}
            exact
          ></Route>
          <Route
            path="/edit_user/:id"
            component={isAdmin ? EditUser : NotFound}
            exact
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
