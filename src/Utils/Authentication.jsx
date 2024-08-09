import { useNavigate } from "react-router-dom";

export function getUserList() {
  let users = localStorage.getItem("user-list");
  if (users) {
    users = JSON.parse(users);
  }
  return users;
}

export function addToUserList(item) {
  const users = getUserList();
  if (!users) {
    localStorage.setItem(
      "user-list",
      JSON.stringify([{ ...item, login: true }])
    );
  } else {
    localStorage.setItem(
      "user-list",
      JSON.stringify([{ ...item, login: true }, ...users])
    );
  }

  delete item.password;

  localStorage.setItem("user", JSON.stringify(item));
}

function handleRegister(user) {
  if (!user?.username) throw "Username is required!";
  if (!user?.email) throw "Email is required!";
  if (!user?.password) throw "Password is required!";

  const userList = getUserList();
  if (!!userList?.length) {
    userList.forEach((x) => {
      if (user.email === x.email) {
        throw "Email already exist!";
      }
    });
  }
  addToUserList(user);
}

export default function useAuth() {
  const navigate = useNavigate();

  function isLogin() {
    if (localStorage.getItem("user")) {
      navigate("/home");
    }
  }

  function logOut() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  function handleLogin(user) {
    if (!user?.email) throw "Email is required!";
    if (!user?.password) throw "Password is required!";

    const userList = getUserList();
    const data = userList.filter((x) => {
      if (user.email === x.email) {
        return x;
      }
    });

    if (!data.length) {
      throw "Email not found";
    } else if (data[0].password !== user.password) {
      throw "Incorrect Password!";
    }
    localStorage.setItem("user", JSON.stringify(data[0]));
    navigate("/home");
  }

  return { getUserList, handleRegister, isLogin, logOut, handleLogin };
}
