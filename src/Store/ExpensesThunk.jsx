import { useSelector } from "react-redux";
import { notifyActions } from "./notification-slice";
import { useEffect } from "react";
import { expenseItemSliceActions } from "./expenseItemSlice";
import { authActions } from "./auth-slice";

const expensesThunk = (expense, premiumStatus, downloadEnabled) => {
  let obj = {
    expense,
    isPremium: premiumStatus,
    isDownloaded: downloadEnabled,
  };
  return async (dispatch) => {
    let useremail = localStorage.getItem("email");
    useremail = useremail.replace("@", "").replace(".", "");

    try {
      const response = await fetch(
        `https://expensetrackerauth-b8c3c-default-rtdb.firebaseio.com/expenses/${useremail}.json`,
        {
          method: "PUT",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("failed");
      } else {
        dispatch(
          notifyActions.display({
            message: "Data sent successfully",
            status: "success",
          })
        );
      }
    } catch (err) {
      dispatch(
        notifyActions.display({
          message: "Data sending Failed",
          status: "Failed",
        })
      );
    }
  };
};

export const fetchData = () => {
  let useremail = localStorage.getItem("email");
  useremail = useremail.replace("@", "").replace(".", "");

  return async (dispatch) => {
    const getData = async () => {
      const response = await fetch(
        `https://expensetrackerauth-b8c3c-default-rtdb.firebaseio.com/expenses/${useremail}.json`
      );
      if (!response.ok) {
        throw new Error("not able to get data");
      }
      const data = await response.json();

      return data;
    };

    try {
      const receivedData = await getData();
      dispatch(expenseItemSliceActions.getDataOnReload(receivedData));
      dispatch(authActions.onReloadActivatePremium(receivedData));
      dispatch(authActions.onDownloadEnabled(receivedData));
      dispatch(
        notifyActions.display({
          message: "Receiveed data succesfully",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        notifyActions.display({
          message: "unable to get data",
          status: "Failed",
        })
      );
    }
  };
};

export default expensesThunk;

// export const getData = () => {
//   console.log("get data called");
//   let useremail = localStorage.getItem("email");
//   useremail = useremail.replace("@", "").replace(".", "");
//   return async (dispatch) => {
//     try {
//       const response = await fetch(
//         `https://expensetrackerauth-b8c3c-default-rtdb.firebaseio.com/expenses/${useremail}.json`
//       );
//       console.log("data fetched");
//       if (!response.ok) {
//         throw new Error("Unable to get data");
//       }
//       const res = await response.json();
//       console.log(res);
//       console.log("responce line");
//       dispatch(
//         notifyActions.display({
//           message: "Data received successfully",
//           status: "success",
//         })
//       );
//     } catch (error) {
//       console.log("get data failed");
//       dispatch(
//         notifyActions.display({
//           message: "Unable to receive data",
//           status: "Failed",
//         })
//       );
//     }
//   };
// };
