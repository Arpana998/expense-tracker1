import { useSelector } from "react-redux";
import ExpenseList from "./ExpenseList";
import "./Welcome.css";
import Welcome from "./Welcome";

const MainPage = () => {
  return (
    <div>
      <Welcome />
      <ExpenseList />
    </div>
  );
};

export default MainPage;
