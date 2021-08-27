import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../utils/contexts/AuthContext";
import axios from "axios";
import { switchCase } from "@babel/types";
import {addDays} from "date-fns"
import localStore from "../utils/localStore";


const Login: React.FC = () => {

  const { user, setUser } = useContext(AuthContext);
  const [formDetails, setFormDetails] = useState({ username: "", password: "" });
  const [message, setMessage] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [showSignupForm, setShowSignUpForm] = useState(false);


  useEffect(() => {
    console.log(formDetails);
  }, [formDetails]);

  const loginUser: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/login", {
        username: formDetails.username,
        password: formDetails.password
      });
      if (res.status === 200) {
        const token = res.data.data.token.token
        const tokenExpirationDate = addDays(Date.now(), Number(res.data.data.token.expiresInDays))
        await localStore.setItem("token", token)
        await localStore.setItem("tokenExpirationDate", tokenExpirationDate)
        setMessage(message => ({ message: res.data.message, type: "success" }));
      } else {
        new Error("Unknown error occurred.");
      }
    } catch (err) {
      setMessage(message => ({ type: "error", message: err.message,}));
    }
  };

  const signupUser: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/signup", {
        username: formDetails.username,
        password: formDetails.password
      });
      if (res.status === 201) {
        setMessage(message => ({ message: res.data.message, type: "success" }));
      } else {
        new Error("Unknown error occurred.");
      }
    } catch (err) {
      setMessage(message => ({ type: "error", message: err.message,}));
    }
  };

  const toggleSignUpForm = () => {
    setShowSignUpForm(showSignupForm => !showSignupForm);
  };

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
