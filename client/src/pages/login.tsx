import React, { useContext, useState } from "react";
import { Box, Container } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useRouter } from "next/router";

import Layout from "../components/common/Layout";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";

import { AuthContext } from "../utils/contexts/AuthContext";


const Login: React.FC = () => {

  const router = useRouter();
  const { signup, login } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [showSignupForm, setShowSignUpForm] = useState(false);
  const [message, setMessage] = useState({ type: "", message: "" });
  const [formDetails, setFormDetails] = useState({ name: "", username: "", password: "" });


  const loginUser: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    setLoading(true);
    try {
      await login(formDetails.username, formDetails.password);
      setMessage(message => ({ type: "success", message: "Logged In" }));
      await router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setMessage(message => ({ type: "error", message: "Unexpected error occurred." }));
    }
    setLoading(false);
  };

  const signupUser: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    setLoading(true);
    try {
      await signup(formDetails.name, formDetails.username, formDetails.password);
      setMessage(message => ({ type: "success", message: "User registered successfully. Please log in." }));
    } catch (err) {
      setMessage(message => ({ type: "error", message: err.message, }));
    }
    setLoading(false);
  };

  const toggleForm = () => {
    setMessage({ type: "", message: "" });
    setFormDetails({ name: "", username: "", password: "" });
    setShowSignUpForm(showSignupForm => !showSignupForm);
  };

  const handleFormOnChange: React.FormEventHandler<HTMLFormElement> = (e) => {
    const target = e.target as HTMLInputElement;
    setFormDetails((formDetails) => ({ ...formDetails, [target.name]: target.value }));
  };


  return (
    <Layout>
      <Box mt={4}>
        <Container maxWidth={"sm"}>

          {
            showSignupForm ? (
              <SignUpForm
                onChange={handleFormOnChange}
                onSubmit={signupUser}
                toggleForm={toggleForm}
                loading={loading}
              />
            ) : (
              <LoginForm onChange={handleFormOnChange} onSubmit={loginUser} toggleForm={toggleForm} loading={loading}/>
            )
          }

          <Box mt={2}>
            {message.message && (
              <Alert severity={message.type as any}>{message.message}</Alert>
            )}
          </Box>

        </Container>
      </Box>
    </Layout>
  );
};


export default Login;
