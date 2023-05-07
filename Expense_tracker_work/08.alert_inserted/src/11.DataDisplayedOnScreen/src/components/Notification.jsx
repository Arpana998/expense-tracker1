import "./Notification.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { notifyActions } from "../Store/notification-slice";

const Notification = () => {
  const dispatch = useDispatch();

  const notifyStatus = useSelector((state) => state.notify);
  const auth = useSelector((state) => state.auth);

  function manageNotify() {
    if (auth.isAuthenticated) {
      dispatch(notifyActions.hideDisplay());
    }
  }
  setTimeout(manageNotify, 3000);

  return (
    <>
      <div
        className='alert alert-danger d-inline-block p-3 w-auto h-25 fixed-botton t-1 r-1 z-5'
        role='alert'
      >
        <div className='fs-5 fw-bolder'>{notifyStatus.message}</div>
      </div>
    </>
  );
};

export default Notification;
