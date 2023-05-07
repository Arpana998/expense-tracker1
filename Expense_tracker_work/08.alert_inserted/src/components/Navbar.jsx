import { useDispatch } from "react-redux";
import { authActions } from "../Store/auth-slice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/", `replace: true`);
  };
  return (
    <nav className='shadow navbar bg-dark' data-bs-theme='dark'>
      <div className='container-fluid'>
        <a className='navbar-brand fs-2 fw-bolder'>Expense Tracker</a>
        <form className='d-flex mr-5' role='search'>
          {!auth.token && (
            <button
              className='btn btn-secondary position-relative py-2 px-4'
              type='submit'
            >
              Sign_Up
            </button>
          )}
          {auth.token != null && (
            <button
              className='btn btn-secondary position-relative py-2 px-4'
              type='submit'
              onClick={logoutHandler}
            >
              LogOut
            </button>
          )}
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
