import "./App.css";
import "./Components/Personal";
import Homepage from "./Components/Homepage";
import Nav from "./Components/Nav";
import Personal from "./Components/Personal";
import LoginPage from "./Components/LoginPage";
import { Routes, Route } from "react-router-dom";
import Messages from "./Components/Messages";
import AuthRoute from "./Components/AuthRoute";
import Events from "./Components/Events";
import ProfilePage from "./Components/ProfilePage";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<AuthRoute />}>
          <Route path="/" element={<Homepage />} />
        </Route>
        <Route path="/activities" element={<AuthRoute />}>
          <Route path="/activities" element={<Personal />} />
        </Route>
        <Route path="/messages" element={<AuthRoute />}>
          <Route path="/messages" element={<Messages />} />
        </Route>
        <Route path="/events" element={<AuthRoute />}>
          <Route path="/events" element={<Events />} />
        </Route>
        <Route path="/profile" element={<AuthRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
