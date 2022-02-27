import "./App.css";
import "./Components/Personal";
import Homepage from "./Components/Homepage";
import Nav from "./Components/Nav";
import Personal from "./Components/Personal";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Messages from "./Components/Messages";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={Homepage()} />
        <Route path="/activities" element={Personal()} />
        <Route path="/messages" element={Messages()} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
