import { Form, Route, Routes } from "react-router-dom";
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

let initialEffect = false;
let toReload = false;
function App() {
  const auth = useSelector((state) => state.auth.isPremium);
  const downloadStatus = useSelector((state) => state.auth.isDownloadEnable);
  const authentication = useSelector((state) => state.auth.isAuthenticated);

  const expenses = useSelector((state) => state.expenseItem.expenseList);

  const dispatch = useDispatch();

  useEffect(() => {
    if (authentication) {
      dispatch(fetchData());
    }
  }, [dispatch]);

  useEffect(() => {
    if (initialEffect === true) {
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
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <Navbar />
      {createPortal(<Notification />, document.getElementById("notification"))}
      {createPortal(<ExpenseForm />, document.getElementById("expenseForm"))}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/welcome' element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;

//{auth.isAuthenticated && <Notification />}
