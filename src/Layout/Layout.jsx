import { Outlet, useNavigate } from "react-router-dom";
import "./layout.scss";

export default function Layout() {
  const navigate = useNavigate();

  return (
    <div className="">
      <nav className="d-flex flex-row gap-3 cursor-pointer-parent justify-content-center align-items-center text-white">
        <p>Home</p>
        <p>Cart</p>
        <p onClick={() => navigate("/profile")}>Profile</p>
      </nav>
      <Outlet />
    </div>
  );
}
