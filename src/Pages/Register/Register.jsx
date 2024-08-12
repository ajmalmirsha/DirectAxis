import { useNavigate } from "react-router-dom";
import LoginCover from "../../../src/assets/Login.svg";
import "./register.scss";
import { useEffect, useState } from "react";
import useAuth from "../../Utils/Authentication";

export default function Register() {
  const navigate = useNavigate();
  const { handleRegister, isLogin } = useAuth();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = () => {
    try {
      handleRegister(user);
      navigate("/home");
    } catch (error) {
      console.log(error);
      setErrMsg(error);
    }
  };

  const handleInputChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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

  const handleLoginNavigate = () => navigate("/login");
  return (
    <div className="container-fluid d-flex flex-row justify-content-between px-0 mx-0">
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <div className="container-fluid w-md-100 w-75 ">
          <h1 className="fs-1 text-fluid text-nowrap">Welcome!</h1>
          <h5 className="text-secondary text-fluid fs-6">
            Please create your account by filling in the details below.
          </h5>
          <br />

          <div className="d-flex flex-column gap-3">
            <div className={`inputWrapper d-flex flex-column gap-1`}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={user.username}
                onChange={handleInputChange}
                placeholder="Enter your Username"
              />
            </div>

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
            <p className={"register"}>
              Already have an account?{" "}
              <span onClick={handleLoginNavigate}>Login</span>
            </p>
          </div>
        </div>
      </div>
      <div className={"ImageWrapper"}>
        <img src={LoginCover} alt="" />
      </div>
    </div>
  );
}
