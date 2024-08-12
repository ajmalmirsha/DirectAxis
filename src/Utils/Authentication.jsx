import { useNavigate } from "react-router-dom";

/**
 * Retrieves the list of users from local storage.
 *
 * @returns {Array<Object>} - An array of user objects retrieved from local storage.
 *                             If no user list is found or there is an error parsing the data,
 *                             an empty array is returned.
 */
export function getUserList() {
  let users = localStorage.getItem("user-list");
  if (users) {
    users = JSON.parse(users);
  }
  return users;
}

/**
 * Adds a user to the user list in local storage and updates the current user data.
 *
 * The function appends the new user to the existing list in local storage. If no user list is found,
 * it creates a new list with the provided user. It also updates the current user data in local storage
 * and removes the `password` field before storing it.
 *
 * @param {Object} item - The user object to be added to the user list. The object should include user details
 *                        and will have the `login` property set to `true`. The `password` field is removed
 *                        before updating the current user data in local storage.
 */
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

/**
 * Registers a new user by validating input and updating the user list.
 *
 * The function performs the following steps:
 * 1. Checks if the `username`, `email`, and `password` fields are present in the `user` object.
 *    Throws an error if any of these fields are missing.
 * 2. Checks if the provided email already exists in the user list.
 *    Throws an error if the email is already registered.
 * 3. Adds the new user to the user list if validation is successful.
 *
 * @param {Object} user - The user object to be registered. It should contain `username`, `email`, and `password` properties.
 *
 * @throws {string} - Throws an error message if required fields are missing or if the email already exists.
 */
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

  /**
   * Checks if a user is logged in by verifying the presence of user data in local storage.
   *
   * If user data is found in local storage, the function redirects the user to the "/home" route.
   *
   * @returns {void}
   */
  function isLogin() {
    if (localStorage.getItem("user")) {
      navigate("/home");
    }
  }

  /**
   * Logs out the current user by removing user data from local storage.
   *
   * After clearing the user data, the function redirects the user to the "/login" route.
   *
   * @returns {void}
   */
  function logOut() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  /**
   * Handles user login by validating credentials and setting user data in local storage.
   *
   * The function performs the following steps:
   * 1. Validates that the `email` and `password` fields are provided in the `user` object.
   *    Throws an error if any of these fields are missing.
   * 2. Retrieves the list of users and checks if the provided email exists in the list.
   *    Throws an error if the email is not found.
   * 3. Verifies that the provided password matches the stored password for the email.
   *    Throws an error if the password is incorrect.
   * 4. Stores the user data in local storage and redirects the user to the "/home" route if login is successful.
   *
   * @param {Object} user - The user object containing `email` and `password` properties for login.
   *
   * @throws {string} - Throws an error message if required fields are missing, email is not found, or password is incorrect.
   *
   * @returns {void}
   */
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
