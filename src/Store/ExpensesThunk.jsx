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
      let receivedData = await getData();
      receivedData = receivedData || {
        expense: {},
        isPremium: false,
        isDownloaded: false,
      };
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
