import { Form, Route, Routes, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import ExpenseForm from "./components/ExpenseForm";
import { createPortal } from "react-dom";
import MainPage from "./components/MainPage";
import expensesThunk, { fetchData } from "./Store/ExpensesThunk";
import { useEffect } from "react";
import { expenseItemSliceActions } from "./Store/expenseItemSlice";
import "./components/Welcome.css";

let initialEffect = false;
function App() {
  const auth = useSelector((state) => state.auth.isPremium);
  const downloadStatus = useSelector((state) => state.auth.isDownloadEnable);
  const authentication = useSelector((state) => state.auth.isAuthenticated);

  const expenses = useSelector((state) => state.expenseItem.expenseList);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (authentication) {
      dispatch(fetchData());
      authentication && navigate("/welcome");
    }
  }, [authentication]);

  useEffect(() => {
    if (initialEffect) {
      let sum = 0;
      for (const key in expenses) {
        sum += expenses[key].amount;
      }
      dispatch(expenseItemSliceActions.totalSpending(sum));
      dispatch(expensesThunk(expenses, auth, downloadStatus));
    }
    initialEffect = true;
  }, [expenses, auth, downloadStatus]);

  return (
    <>
      <Navbar />
      {createPortal(<Notification />, document.getElementById("notification"))}
      {createPortal(<ExpenseForm />, document.getElementById("expenseForm"))}
      <Routes>
        <Route path='/' element={<Login />} />
        {authentication && <Route path='/welcome' element={<MainPage />} />}
        {!authentication && <Route path='*' element={<Navigate to='/' />} />}
        <Route path='*' element={<Navigate to='/welcome' />} />
      </Routes>
    </>
  );
}

export default App;

//{auth.isAuthenticated && <Notification />}
