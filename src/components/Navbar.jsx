import "./Navbar.css";
import { useDispatch } from "react-redux";
import { authActions } from "../Store/auth-slice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyEmail } from "../Store/authAction";
import { Icon } from "@iconify/react";
import { themeActions } from "../Store/themeSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/", `replace: true`);
  };

  const verifyEmailHandler = () => {
    dispatch(verifyEmail());
  };

  const darkThemeHandler = () => {
    dispatch(themeActions.changeTheme());
  };

  return (
    <nav className='shadow navbar bg-dark' data-bs-theme='dark'>
      <div className='container-lg d-flex flex-wrap justify-content-between w-100 align-items-center flex-sm-column flex-md-row px-4'>
        <a className='navbar-brand fs-2 fw-bolder'>
          <img
            src='https://cdn-icons-png.flaticon.com/512/6289/6289247.png'
            alt='expense tracker'
            style={{ height: "4rem" }}
            className='me-3'
          />
          Expense Tracker
        </a>
        <div
          className='d-flex flex-sm-row-reverse justify-content-between  gap-3'
          role='search'
        >
          {!auth.token && (
            <button className='btn btn-secondary position-relative me-3 '>Sign_Up</button>
          )}
          {auth.isPremium && (
            <button className='btn btn-sm btn-secondary' onClick={darkThemeHandler}>
              Dark Theme
            </button>
          )}
          {auth.token && (
            <button className='btn btn-secondary' onClick={logoutHandler}>
              LogOut
            </button>
          )}
          {auth.token && (
            <button className='btn btn-secondary' onClick={verifyEmailHandler}>
              Verify_Email
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
