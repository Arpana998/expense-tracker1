import "./Navbar.css";
import { useDispatch } from "react-redux";
import { authActions } from "../Store/auth-slice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyEmail } from "../Store/authAction";
import { Icon } from "@iconify/react";

const Navbar = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/", `replace: true`);
  };

  const verifyEmailHandler = () => {
    verifyEmail();
  };

  return (
    <nav className='shadow navbar bg-dark' data-bs-theme='dark'>
      <div className='container-fluid'>
        <a className='navbar-brand fs-2 fw-bolder flex-md-row flex-sm-column'>
          Expense Tracker
          <Icon className='expense_tracker_icon' icon='mdi:spy' />
        </a>
        <form className='d-flex mr-5 flex-md-row flex-sm-row-reverse ' role='search'>
          {!auth.token && (
            <button
              className='btn btn-secondary position-relative me-3 py-2 px-4 '
              type='submit'
            >
              Sign_Up
            </button>
          )}
          {auth.token != null && (
            <button
              className='btn btn-secondary position-relative py-2 px-4 float-end'
              type='submit'
              onClick={logoutHandler}
            >
              LogOut
            </button>
          )}
          {auth.token != null && (
            <button
              className='btn btn-secondary position-relative ms-4 me-3 py-2 px-4 float-end'
              type='submit'
              onClick={verifyEmailHandler}
            >
              Verify_Email
            </button>
          )}
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
