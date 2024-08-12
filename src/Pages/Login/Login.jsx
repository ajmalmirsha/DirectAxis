import { useNavigate } from "react-router-dom";
import LoginCover from "../../../src/assets/Login.svg";
import "./login.scss";
import useAuth from "../../Utils/Authentication";
import { useEffect, useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const { handleLogin, isLogin } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState("");

  const handleInputChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    try {
      handleLogin(user);
    } catch (error) {
      console.log(error);
      setErrMsg(error);
    }
  };

  const handleRegisterNavigate = () => navigate("/register");

  useEffect(() => {
    isLogin();
  }, []);

  useEffect(() => {
    if (errMsg) {
      setTimeout(() => {
        setErrMsg("");
      }, 2000);
    }
  }, [errMsg]);

  return (
    <div className="container-fluid d-flex flex-row justify-content-between px-0 mx-0">
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <div className="container-fluid w-md-100 w-75 ">
          <h1 className="fs-1 text-fluid text-nowrap">Welcome back</h1>
          <h5 className="text-secondary text-fluid fs-6">
            Welcome back! Please enter your details.
          </h5>
          <br />

          <div className="d-flex flex-column gap-3">
            <div className={`inputWrapper d-flex flex-column gap-1`}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </div>

            <div className={`inputWrapper d-flex flex-column gap-1`}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
                placeholder="**********"
              />
            </div>

            <p className="text-danger">{!!errMsg && errMsg}</p>

            <button className={`submitBtn btn`} onClick={handleSubmit}>
              Submit
            </button>
            <p className="register">
              Don't have an account?{" "}
              <span onClick={handleRegisterNavigate}>Register for free.</span>
            </p>
          </div>
        </div>
      </div>
      <div className="ImageWrapper">
        <img src={LoginCover} alt="" />
      </div>
    </div>
  );
}
