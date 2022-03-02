import "./App.css";
import "./Components/Personal";
import Homepage from "./Components/Homepage";
import Nav from "./Components/Nav";
import Personal from "./Components/Personal";
import LoginPage from "./Components/LoginPage";
import { Routes, Route } from "react-router-dom";
import Messages from "./Components/Messages";
import AuthRoute from "./Components/AuthRoute";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/login" element={LoginPage()} />
        <Route
          path="/"
          element={
            <AuthRoute>
              <Homepage />
            </AuthRoute>
          }
        />
        <Route
          path="/activities"
          element={
            <AuthRoute>
              <Personal />
            </AuthRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <AuthRoute>
              <Messages />
            </AuthRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
