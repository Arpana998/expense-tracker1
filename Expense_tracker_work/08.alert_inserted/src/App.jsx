import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import { useEffect } from "react";
import Notification from "./components/Notification";

function App() {
  useEffect(() => {}, []);
  return (
    <>
      <Notification />
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/welcome' element={<Welcome />} />
      </Routes>
    </>
  );
}

export default App;
