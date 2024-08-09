export function useUser() {
  function getUserData() {
    let user = localStorage.getItem("user");
    return JSON.parse(user) || null;
  }

  const userData = getUserData()

  return { getUserData, userData };
}
