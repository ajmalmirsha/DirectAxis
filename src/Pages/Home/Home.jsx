import useAuth from "../../Utils/Authentication";
import { useUser } from "../../Utils/util";

export default function Home() {
  const { logOut } = useAuth();
  const { userData } = useUser();
  return (
    <div>
      <button onClick={logOut}>Logout</button>
      <h1>hey {userData?.username}</h1>
    </div>
  );
}
