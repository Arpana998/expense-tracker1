import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseItemSliceActions } from "../Store/expenseItemSlice";
import { notifyActions } from "../Store/notification-slice";
import ExpensesThunk from "../Store/ExpensesThunk";

let initialeffect = false;
const ExpenseForm = () => {
  const dispatch = useDispatch();

  const expenseSlice = useSelector((state) => state.expenseItem);

  const descriptionRef = useRef();
  const amountRef = useRef();
  const categoryRef = useRef();
  const dateRef = useRef();

  const expenseData = useSelector((state) => state.expenseItem);

  useEffect(() => {
    initialeffect = true;
    if (expenseData.editItemId) {
      //to run useEffect only when id has value
      const expense = expenseData.expenseList[expenseData.editItemId];

      descriptionRef.current.value = expense.description;
      categoryRef.current.value = expense.category;
      dateRef.current.value = expense.date;
      amountRef.current.value = expense.amount;
    }
  }, [expenseData.editItemId]);

  // amountRef.current.value = expense.amount;

  const addExpenseHandler = (event) => {
    event.preventDefault();
    let item = {
      description: descriptionRef.current.value,
      amount: +amountRef.current.value,
      category: categoryRef.current.value,
      date: dateRef.current.value,
      id: expenseData.editItemId || Math.random().toString().slice(2) + "a",
    };

    if (expenseData.editItemId) {
      dispatch(expenseItemSliceActions.editItemData(item));
      dispatch(expenseItemSliceActions.setEditItemId());
      dispatch(expenseItemSliceActions.hideForm());
    } else {
      dispatch(expenseItemSliceActions.addExpenseItem(item));
      dispatch(expenseItemSliceActions.hideForm());
    }
    dispatch(
      notifyActions.display({
        message: "Expense item added successfully",
        status: "success",
      })
    );
    console.log("nitify add item");
  };

  const modalHandler = (event) => {
    event.preventDefault();
    dispatch(expenseItemSliceActions.hideForm());
  };

  return (
    <>
      {expenseSlice.formIsShown && (
        <>
          <div
            onClick={modalHandler}
            className='z-index-4 position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50'
          ></div>
          <div className='modal-dialog z-index-5 position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center'>
            <div className='card' style={{ width: "25rem", padding: "1rem" }}>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h1 className='modal-title fs-4 fw-semibold' id='exampleModalLabel'>
                    {expenseData.editItemId ? "Edit Expenses" : "Add Expenses"}
                  </h1>

                  <button
                    type='button'
                    className='btn-close'
                    onClick={modalHandler}
                  ></button>
                </div>
                <div className='modal-body mt-3 mb-3'>
                  <div className='form-floating mb-3'>
                    <input
                      type='text'
                      className='form-control'
                      id='floatingInput'
                      placeholder=''
                      ref={descriptionRef}
                    />
                    <label htmlFor='floatingInput'>Expense Description</label>
                  </div>
                  <div className='form-floating'>
                    <input
                      type='number'
                      className='form-control'
                      id='floatingnumber'
                      placeholder=''
                      ref={amountRef}
                    />
                    <label htmlFor='floatingnumber'>Expense Amount</label>
                  </div>
                  <div className='form-floating mt-3'>
                    <select
                      className='form-select'
                      id='floatingSelectGrid'
                      ref={categoryRef}
                    >
                      <option defaultValue={1}>Choose</option>
                      <option value='House Expense'>House Expense</option>
                      <option value='Health'>Health</option>
                      <option value='leisure'>leisure</option>
                    </select>
                    <label htmlFor='floatingSelectGrid'>Expense Category</label>
                  </div>
                  <div className='form-floating mt-3'>
                    <input
                      type='date'
                      className='form-control'
                      id='floatingnumber'
                      placeholder=''
                      ref={dateRef}
                    />
                    <label htmlFor='floatingnumber'>Date</label>
                  </div>
                </div>
                <hr className='border border-dark border-3 opacity-75 mr-0'></hr>
                <div className='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-outline-dark fs-6 fw-semibold'
                    onClick={modalHandler}
                  >
                    Close
                  </button>
                  <button
                    type='button'
                    className='btn btn-outline-dark ms-3 fs-6 fw-semibold'
                    onClick={addExpenseHandler}
                  >
                    {expenseData.editItemId ? "Edit Expenses" : "Add Expenses"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ExpenseForm;

// const [show, setShow] = useState(false);

// const dispatch = useDispatch();

// const ModalHandler = () => {
//   dispatch(expenseItemSliceActions.displayForm());
// onClick = { ModalHandler };
// };

//   onClick = { ModalHandler };
//   onClick = {() => setShow(!show)}
// onClick = {() => setShow(!show)}
//   <button onClick={() => setShow(!show)}>Show modal</button>
