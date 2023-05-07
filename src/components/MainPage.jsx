import { useSelector } from "react-redux";
import ExpenseList from "./ExpenseList";
import Welcome from "./Welcome";

const MainPage = () => {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <Welcome />
      <ExpenseList />
    </div>
  );
};

export default MainPage;
