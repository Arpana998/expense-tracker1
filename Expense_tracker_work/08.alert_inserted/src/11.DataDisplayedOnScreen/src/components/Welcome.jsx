import { useDispatch } from "react-redux";
import "./Welcome.css";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import expenseItemSlice from "../Store/expenseItemSlice";
import { expenseItemSliceActions } from "../Store/expenseItemSlice";

const Welcome = () => {
  const dispatch = useDispatch();

  const expenseFormHandler = (event) => {
    event.preventDefault();
    console.log("expenseFormHandler clicked");

    dispatch(expenseItemSliceActions.displayForm());
  };

  return (
    <>
      <div className='tostore'>
        <div className='row'>
          <div className='col-sm-6  col-lg-3 mb-3 mb-sm-4 '>
            <div className='card border-black'>
              <div className='card-body p-4' style={{ maxHeight: "18rem" }}>
                <h5 className='card-title'>Total Spending</h5>
                <p className='card-text'>Spend carefully.</p>
                <h3>
                  <span className='badge text-bg-success p-2 float-start m-3'>1000K</span>
                </h3>
                <Icon
                  className='total_icon'
                  icon='material-symbols:calculate-outline-rounded'
                />
              </div>
            </div>
          </div>
          <div className='col-sm-6  col-lg-3 mb-3 mb-sm-4  '>
            <div className='card border-black'>
              <div className='card-body p-4' style={{ maxHeight: "18rem" }}>
                <h5 className='card-title'>Add Expense</h5>
                <p className='card-text'>Is it necessary?</p>
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
          <div className='col-sm-6  col-lg-3 mb-3 mb-sm-4  '>
            <div className='card border-black'>
              <div className='card-body p-4' style={{ maxHeight: "18rem" }}>
                <h5 className='card-title'>Total Customers</h5>
                <p className='card-text'>Are network of service.</p>
                <h3>
                  <span className='badge text-bg-warning p-2 float-start m-3'>1001K</span>
                </h3>
                <Icon className='total_customer' icon='fa-solid:user-friends' />
              </div>
            </div>
          </div>
          <div className='col-sm-6  col-lg-3 mb-3 mb-sm-4  '>
            <div className='card border-black'>
              <div className='card-body p-4' style={{ maxHeight: "18rem" }}>
                <h5 className='card-title'>Pro Requirements</h5>
                <p className='card-text'>Lorem ipsum dolor</p>
                <h3>
                  <span className='badge text-bg-info p-2 float-start m-3'>10000</span>
                </h3>
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
