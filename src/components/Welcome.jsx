import { useDispatch } from "react-redux";
import "./Welcome.css";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import expenseItemSlice from "../Store/expenseItemSlice";
import { expenseItemSliceActions } from "../Store/expenseItemSlice";
import { authActions } from "../Store/auth-slice";
import { notifyActions } from "../Store/notification-slice";

const Welcome = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const themeStyle = useSelector((state) => state.theme.setTheme);
  const expense = useSelector((state) => state.expenseItem);

  const expenseFormHandler = (event) => {
    event.preventDefault();

    dispatch(expenseItemSliceActions.displayForm());
  };

  const premiumHandler = () => {
    dispatch(authActions.activatePremium());
    dispatch(
      notifyActions.display({
        message: "Premium Account Activated",
        status: "success",
      })
    );
  };

  let preRequirementAmount = (
    <span className='badge text-bg-info p-2 float-start m-3'>
      {10000 - expense.totalSpending}
    </span>
  );
  // preRequirementAmount <= 0 ? <button></button> : preRequirementAmount;
  if (10000 - expense.totalSpending <= 0) {
    preRequirementAmount = (
      <button className='btn btn-success mt-3' onClick={premiumHandler}>
        Activate
      </button>
    );
  }

  const downloadHandler = () => {
    const expenses = Object.values(expense.expenseList);

    // let obj = Object.entries(expense.expenseList);
    // obj.map((item) => console.log(item[1].category));

    const header = Object.keys(expenses[0]).join(",") + "\n";
    const csv = header + expenses.map((obj) => Object.values(obj).join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" }); //csv = file extension used in spread sheet
    const url = URL.createObjectURL(blob);

    const fileName = "Expenses " + new Date().toLocaleString() + ".csv";
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();

    dispatch(authActions.downloadManager());
    dispatch(
      notifyActions.display({
        message: "Downloaded successfully",
        status: "success",
      })
    );
  };

  if (auth.isPremium) {
    preRequirementAmount = (
      <Icon
        onClick={downloadHandler}
        className='download-icon '
        icon='material-symbols:download-for-offline-rounded'
      />
    );
  }
  //

  return (
    <>
      <div className={`p-4 ${themeStyle && "darkTheme"}`}>
        <div className='container-lg m-auto row g-4'>
          <div className='col-sm-12 col-md-6 col-xl-3'>
            <div
              style={{ boxShadow: `grey 0px 5px 15px` }}
              className={`card border-black rounded-5 ${
                themeStyle && "darkTheme border-white border-4"
              }`}
            >
              <div className='card-body p-4' style={{ height: "11rem" }}>
                <h5
                  className={`card-title text-black ${themeStyle && "text-white shadow"}`}
                >
                  Total Spending
                </h5>
                <p className={`card-text text-black ${themeStyle && "text-white"}`}>
                  Spend carefully.
                </p>
                <h3>
                  <span className='badge text-bg-success p-2 float-start m-3'>
                    {expense.totalSpending}
                  </span>
                </h3>
                <Icon
                  className='total_icon'
                  icon='material-symbols:calculate-outline-rounded'
                />
              </div>
            </div>
          </div>
          <div className='col-sm-12 col-md-6 col-xl-3'>
            <div
              style={{ boxShadow: `grey 0px 5px 15px` }}
              className={`card border-black rounded-5 ${
                themeStyle && "darkTheme border-white border-4"
              }`}
            >
              <div className='card-body p-4' style={{ height: "11rem" }}>
                <h5 className={`card-title ${themeStyle && "text-white shadow"}`}>
                  Add Expense
                </h5>
                <p className={`card-title ${themeStyle && "text-white shadow-lg"}`}>
                  Is it necessary?
                </p>
                <h3>
                  <span className='badge text-bg-danger p-2 float-start m-3'>$0 </span>
                </h3>
                <Icon
                  className='add_expense_icon'
                  icon='material-symbols:add-circle-rounded'
                  onClick={expenseFormHandler}
                />
              </div>
            </div>
          </div>
          <div className='col-sm-12 col-md-6 col-xl-3  '>
            <div
              style={{ boxShadow: `grey 0px 5px 15px` }}
              className={`card border-black rounded-5 ${
                themeStyle && "darkTheme border-white border-4"
              }`}
            >
              <div className='card-body p-4' style={{ height: "11rem" }}>
                <h5 className={`card-title ${themeStyle && "text-white shadow"}`}>
                  Total Customers
                </h5>
                <p className={`card-text ${themeStyle && "text-white shadow"}`}>
                  Are network of service.
                </p>
                <h3>
                  <span className='badge text-bg-warning p-2 float-start m-3'>1001K</span>
                </h3>
                <Icon className='total_customer' icon='fa-solid:user-friends' />
              </div>
            </div>
          </div>
          <div className='col-sm-12 col-md-6 col-xl-3'>
            <div
              style={{ boxShadow: `grey 0px 5px 15px` }}
              className={`card border-black rounded-5  ${
                themeStyle && "darkTheme border-white border-4 "
              }`}
            >
              <div className='card-body p-4' style={{ height: "11rem" }}>
                <h5 className={`card-title ${themeStyle && "text-white shadow"}`}>
                  Pro Requirements
                </h5>
                <p className={`card-title ${themeStyle && "text-white shadow-lg"}`}>
                  Lorem ipsum dolor
                </p>
                <h3>{preRequirementAmount}</h3>
                <Icon className='spending_icon' icon='ep:success-filled' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
// className={`col-sm-6  col-xl-3 mb-3 mb-sm-4  ${isDarktrue && "bg-secondary"}`}
//
// let expenseArrayValues = Object.values(expense.expenseList);
// const fileTyle =
//   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
// const dateTime = new Date().toLocaleString();

// const ws = XLSX.utils.json_to_sheet(expenseArrayValues);
// const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
// const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
// const data = new Blob([excelBuffer], { type: fileTyle });

// //? Actual object to download sheet
// FileSaver.saveAs(data, "Expenses - " + dateTime + ".xlsx");
