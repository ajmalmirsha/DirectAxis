import { useContext, useState } from "react";
import "./profile.scss";
import { Context } from "../../Context/Store";

export default function Profile() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    fName: "",
    lName: "",
    age: null,
    place: "",
    address: "",
  });

  const { userData, setUserData } = useContext(Context);

  const handleInputChange = (e) => {
    setUserData(e.target.name, e.target.value);
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    console.log(userData);
  };

  return (
    <div className="profile d-flex flex-column gap-4">
      <div className="imageWrapper">
        <div className="cover">
          <div className="circle"></div>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h1>Ajmal KK</h1>
        <h5 className="email">ajmalmirshaa2004@gmail.com</h5>
      </div>
      <div className="d-flex gap-4 flex-column align-items-center justify-content-center">
        <div className="w-50 d-flex flex-column gap-4">
          <div className="d-flex d-flex justify-content-between">
            <h5>BASIC INFO</h5>
            <div className="d-flex gap-3">
              <button className="btn btn-outline-secondary">Cancel</button>
              <button onClick={handleSave} className="btn save-btn">
                Save
              </button>
            </div>
          </div>

          <div className="d-flex gap-3">
            <div className="d-flex flex-column gap-1 w-100">
              <label htmlFor="fName">FIRST NAME</label>
              <input
                id="fName"
                value={userData.fName}
                onChange={handleInputChange}
                name="fName"
                type="text"
              />
            </div>
            <div className="d-flex flex-column gap-1 w-100">
              <label htmlFor="lName">LAST NAME</label>
              <input
                id="lName"
                value={userData.lName}
                onChange={handleInputChange}
                name="lName"
                type="text"
              />
            </div>
          </div>

          <div className="d-flex gap-3">
            <div className="d-flex flex-column gap-1 w-100">
              <label htmlFor="age">AGE</label>
              <input
                id="age"
                value={userData.age}
                onChange={handleInputChange}
                name="age"
                type="number"
              />
            </div>
            <div className="d-flex flex-column gap-1 w-100">
              <label htmlFor="place">PLACE</label>
              <input
                id="place"
                value={userData.place}
                onChange={handleInputChange}
                name="place"
                type="text"
              />
            </div>
          </div>

          <div className="d-flex flex-column gap-1 w-100">
            <label htmlFor="address">ADDRESS</label>
            <input
              id="address"
              value={userData.address}
              onChange={handleInputChange}
              name="address"
              type="text"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
