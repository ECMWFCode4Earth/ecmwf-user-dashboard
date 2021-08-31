import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../utils/contexts/AuthContext";


const Login: React.FC = () => {

  const { signup, login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showSignupForm, setShowSignUpForm] = useState(false);
  const [message, setMessage] = useState({ type: "", message: "" });
  const [formDetails, setFormDetails] = useState({ username: "", password: "" });


  const loginUser: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await login(formDetails.username, formDetails.password);
      setMessage(message => ({ type: "success", message: "Logged In" }));
    } catch (err) {
      setMessage(message => ({ type: "error", message: err.message, }));
    }
  };

  const signupUser: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await signup(formDetails.username, formDetails.password);
      setMessage(message => ({ message: "Sign in", type: "success" }));
    } catch (err) {
      setMessage(message => ({ type: "error", message: err.message, }));
    }
  };

  const toggleSignUpForm = () => setShowSignUpForm(showSignupForm => !showSignupForm);

  const handleFormOnChange: React.FormEventHandler<HTMLFormElement> = (e) => {
    const target = e.target as HTMLInputElement;
    setFormDetails((formDetails) => ({ ...formDetails, [target.name]: target.value }));
  };


  return (
    <div>

      {
        showSignupForm ? (
          <div>
            <h1>Sign Up</h1>
            <form onChange={handleFormOnChange} onSubmit={signupUser}>
              <input type={"text"} title={"Username"} placeholder={"Username"} name={"username"}/>
              <input type={"password"} title={"Password"} placeholder={"Password"} name={"password"}/>
              <input type={"submit"} value={"Sign Up"}/>
            </form>
            <p>Already have an account? <span onClick={toggleSignUpForm}>Log In</span></p>
            <p>{message.message}</p>
          </div>
        ) : (
          <div>
            <h1>Log In</h1>
            <form onChange={handleFormOnChange} onSubmit={loginUser}>
              <input type={"text"} title={"Username"} placeholder={"Username"} name={"username"}/>
              <input type={"password"} title={"Password"} placeholder={"Password"} name={"password"}/>
              <input type={"submit"} value={"Login"}/>
            </form>
            <p>Dont have an account? <span onClick={toggleSignUpForm}>Sign Up</span></p>
            <p>{message.message}</p>
          </div>
        )
      }
    </div>
  );
};


export default Login;
