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

export default authenticateUser;
