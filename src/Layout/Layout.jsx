import { Outlet, useNavigate } from "react-router-dom";
import "./layout.scss";

export default function Layout() {
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <div className="">
      <nav className="navWrapper d-flex flex-row px-3 cursor-pointer-parent justify-content-between align-items-center text-white">
        <div>

        </div>
        <div className="gap-3 d-flex flex-row justify-content-end">
          <p onClick={() => navigate("/home")}>Home</p>
          <p onClick={() => navigate("/cart")}>Cart</p>
          <p onClick={() => navigate("/profile")}>Profile</p>
        </div>
        <div className="d-flex flex-row justify-content-end">
          <button onClick={logOut} className="btn logout-btn">
            Logout
          </button>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
