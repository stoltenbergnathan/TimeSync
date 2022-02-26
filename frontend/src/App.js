import "./App.css";
import "./Components/Personal";
import Homepage from "./Components/Homepage";
import Navbar from "./Components/Navbar";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
}

export default App;
