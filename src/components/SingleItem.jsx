import { useDispatch, useSelector } from "react-redux";
import { expenseItemSliceActions } from "../Store/expenseItemSlice";
import { notifyActions } from "../Store/notification-slice";

const SingleItem = (props) => {
  const dispatch = useDispatch();
  const themeStyle = useSelector((state) => state.theme.setTheme);

  const editHandler = (id) => {
    dispatch(expenseItemSliceActions.displayForm());
    dispatch(expenseItemSliceActions.idToBeEdited(id));
    dispatch(
      notifyActions.display({
        message: "Expense Item edited succesfully",
        status: "success",
      })
    );
  };
  // dispatch(
  //   notifyActions.display({
  //     message: "Expense item edited successfully",
  //     status: "success",
  //   })
  // );

  const deleteHandler = (id) => {
    dispatch(expenseItemSliceActions.deleteExpenseItem(id));
    dispatch(
      notifyActions.display({
        message: "Expense Item deleted successfully",
        status: "success",
      })
    );
  };
  // dispatch(
  //   notifyActions.display({
  //     message: "Expense item deleted successfully",
  //     status: "success",
  //   })
  // );

  return (
    <tr className={`className='fs-3 fw-semibold ${themeStyle && "text-white"}`}>
      <th scope='row'>1</th>
      <td>{props.desciption}</td>
      <td>{props.amount}</td>
      <td>{props.category}</td>
      <td>{props.date}</td>
      <td>
        <button
          className='btn btn-danger me-3'
          onClick={() => {
            deleteHandler(props.id, props.amount);
          }}
        >
          Delete
        </button>
        <button
          className='btn btn-warning'
          onClick={() => {
            editHandler(props.id, props.desciption, props.amount, props.category);
          }}
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default SingleItem;
