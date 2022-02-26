import "./App.css";
import "./Components/Personal";
import Homepage from "./Components/Homepage";
import Navbar from "./Components/Navbar";
import Personal from "./Components/Personal";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={Homepage()} />
        <Route path="/activities" element={Personal()} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
