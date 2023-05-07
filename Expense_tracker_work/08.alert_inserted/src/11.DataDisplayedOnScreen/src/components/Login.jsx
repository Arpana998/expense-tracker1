import { useState, useRef } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authenticateUser from "../Store/authAction";

const Login = () => {
  const [signIn, setSignIn] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const signUpHandler = () => {
    setSignIn(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const obj = {
      inputEmail: emailRef.current.value,
      inputPassword: passwordRef.current.value,
      signIn: signIn,
    };

    // authenticateUser({ email: inputEmail, password: inputPassword, signIn: signIn });
    dispatch(authenticateUser(obj)); //sending data to thunk

    navigate("/welcome");
  };

  return (
    <div className='login template d-flex justify-content-center align-items-center vh-100 bg-primary'>
      <div className='form_container shadow p-5 rounded bg-white'>
        <form onSubmit={submitHandler}>
          {signIn && <h3 className='text-center'>Sign Up</h3>}
          {!signIn && <h3 className='text-center'>Sign In</h3>}
          <div className='mb-3'>
            <label htmlFor='email' className='mb-2'>
              Email
            </label>
            <input
              type='email'
              placeholder='Enter Email'
              className='form-control'
              ref={emailRef}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='password' className='mb-2'>
              Password
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              className='form-control'
              ref={passwordRef}
            />
          </div>
          <div className='d-grid mt-4'>
            {signIn && <button className='btn btn-primary'>Sign up</button>}
            {!signIn && <button className='btn btn-primary'>Sign In</button>}
          </div>
          {!signIn && (
            <p className='text-end mt-3' onClick={signUpHandler}>
              Sign Up
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
