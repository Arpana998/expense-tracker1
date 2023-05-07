import { useSelector } from "react-redux";
import SingleItem from "./SingleItem";
import "./ExpenseList.css";

const ExpenseList = () => {
  const themeStyle = useSelector((state) => state.theme.setTheme);

  const data = useSelector((state) => state.expenseItem);
  const dataList = [];
  const expenseList = data.expenseList;
  for (const key in expenseList) {
    dataList.push(expenseList[key]);
  }

  // const sendData = () => {
  //   async(dispatch);
  // };

  return (
    <div className={`${themeStyle && "darkThemeExpenseList"}`}>
      <div className={`container ${themeStyle && "darkThemeExpenseList"}`}>
        <h2
          className={`fs-3 text-center fw-bold text-decoration-underline py-5 ${
            themeStyle && "text-white text-center fw-bold text-decoration-underline py-5"
          }`}
        >
          Expense Items
        </h2>
        <div className={`table-responsive ${themeStyle && "darkThemeExpenseList"}`}>
          <table
            className={`table table-striped table-hover ${themeStyle && "table-dark"}`}
          >
            <thead>
              <tr className={`fs-6 fw-bolder ${themeStyle && "text-white"}`}>
                <th scope='col'>#</th>
                <th scope='col'>Expense Description</th>
                <th scope='col'>Expense Amount</th>
                <th scope='col'>Expense Category</th>
                <th scope='col'>Expense Date</th>
                <th scope='col'>Delete / Edit</th>
              </tr>
            </thead>
            <tbody className='table-group-divider'>
              {dataList.map((item) => (
                <SingleItem
                  desciption={item.description}
                  amount={item.amount}
                  category={item.category}
                  date={item.date}
                  id={item.id}
                  key={item.id}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
