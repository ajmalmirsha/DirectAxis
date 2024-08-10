import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import { ContextProvider } from "./Context/Store";

function App() {
  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
}

export default App;
