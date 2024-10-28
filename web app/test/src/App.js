import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Send_file from "./components/Send_file";
import Receive_file from "./components/Receive_file";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/send_file" element={<Send_file />} />
          <Route path="/receive_file" element={<Receive_file />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
  
}

export default App;
