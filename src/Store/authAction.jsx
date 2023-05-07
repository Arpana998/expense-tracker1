import { authActions } from "./auth-slice";
import { notifyActions } from "./notification-slice";

const authenticateUser = (data) => {
  return async (dispatch) => {
    const sendUserData = async () => {
      let url;
      if (data.signIn) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCguEEEoRMwtGZ-c3GxX8gPpjpqK71a9wg";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCguEEEoRMwtGZ-c3GxX8gPpjpqK71a9wg";
      }

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: data.inputEmail,
          password: data.inputPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("authentication failed");
      }
      const res = await response.json();
      return res;
    };

    try {
      const userData = await sendUserData();
      dispatch(
        authActions.login({
          email: userData.email,
          token: userData.idToken,
        })
      );
      dispatch(
        notifyActions.display({
          message: "Authentication Successful",
          status: "success",
        })
      );
    } catch (err) {
      dispatch(
        notifyActions.display({
          message: "Authentication Failed",
          status: "Failed",
        })
      );
    }
  };
};

export const verifyEmail = () => {
  return async (dispatch) => {
    let authToken = localStorage.getItem("idToken");
    console.log("calling verify mail");
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCguEEEoRMwtGZ-c3GxX8gPpjpqK71a9wg",
        {
          method: "POST",
          requestType: "VERIFY_EMAIL",
          idToken: authToken,
        }
      );
      dispatch(
        notifyActions.display({
          message: "Email Verification successful",
          status: "success",
        })
      );
      console.log("running notificatio");
    } catch (err) {
      dispatch(
        notifyActions.display({
          message: "Email Verification Failed",
          status: "Failed",
        })
      );
      console.log("caught error");
    }
  };
};

export default authenticateUser;