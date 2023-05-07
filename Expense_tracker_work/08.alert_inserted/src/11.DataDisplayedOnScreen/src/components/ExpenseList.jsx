import { useEffect } from "react";
import { useSelector } from "react-redux";
import SingleItem from "./SingleItem";

const ExpenseList = () => {
  const data = useSelector((state) => state.expenseItem);
  const dataList = [];
  const expenseList = data.expenseList;
  for (const key in expenseList) {
    dataList.push(expenseList[key]);
  }

  // const dataList = Object.entries(data);
  // console.log(dataList);

  // useEffect(() => {
  //   console.log("expenses from use effect", data.expenseList);
  // }, [data.expenseList]);

  return (
    <div className='container p-5'>
      <div>
        <table className='table'>
          <thead>
            <tr className='fs-4 fw-bolder'>
              <th scope='col'>#</th>
              <th scope='col'>Expense Description</th>
              <th scope='col'>Expense Amount</th>
              <th scope='col'>Expense Category</th>
              <th scope='col'>Edit / Delete</th>
            </tr>
          </thead>
          {dataList.map((item) => (
            <SingleItem
              desciption={item.itemDescription}
              amount={item.itemAmount}
              category={item.itemCategory}
              id={item.itemId}
              key={item.itemId}
            />
          ))}

          {/* <tbody className='table-group-divider'>
            <tr className="className='fs-3 fw-semibold">
              <th scope='row'>1</th>
              <td>dfg</td>
              <td>dggs</td>
              <td>ggt</td>
              <td>
                <button>Add</button>
              </td>
            </tr>
          </tbody> */}
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
