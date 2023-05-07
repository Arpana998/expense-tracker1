import { Form, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import Notification from "./components/Notification";
import { useSelector } from "react-redux";
import ExpenseForm from "./components/ExpenseForm";
import { createPortal } from "react-dom";

function App() {
  const auth = useSelector((state) => state.auth);

  return (
    <>
      {auth.isAuthenticated && <Notification />}
      {createPortal(<ExpenseForm />, document.getElementById("expenseForm"))}
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/welcome' element={<Welcome />} />
      </Routes>
    </>
  );
}

export default App;
