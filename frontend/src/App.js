import "./App.css";
import "./Components/Personal";
import Homepage from "./Components/Homepage";
import Navbar from "./Components/Navbar";
import { ReactRouter } from "react-router-dom";

function App() {
  return (
    <ReactRouter>
      <Navbar />
    </ReactRouter>
  );
}

export default App;
