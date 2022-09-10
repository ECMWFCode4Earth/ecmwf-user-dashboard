import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useRouter } from "next/router";

import Layout from "../components/common/Layout";
import FullWidthButton from "../components/FullWidthButton";
import FullWidthTextField from "../components/FullWidthTextField";
import CustomDivider from "../components/CustomDivider";
import ChangePasswordDialog from "../components/ChangePasswordDialog";

import { AuthContext } from "../utils/contexts/AuthContext";
import { TabManagerContext } from "../utils/contexts/TabManagerContext";
import { useDrawer } from "../utils/hooks/useDrawer";


const Account: React.FC = () => {

  const router = useRouter();
  const { user, logout, fetchApiTokens, updateApiTokens } = useContext(AuthContext);
  const { clearTabManager } = useContext(TabManagerContext);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ severity: "", text: "" });

  const [readOnly, setReadOnly] = useState(true);
  const [apiTokens, setApiTokens] = useState({ token1: "", token2: "" });
  const { open, onClose, onOpen } = useDrawer();


  useEffect(() => {
    fetchApiTokens()
      .then((data) => setApiTokens(data.apiTokens))
      .catch((err) => setMessage({ severity: "error", text: err.message }));
  }, []);


  const updateTokens = async () => {
    try {
      await updateApiTokens(apiTokens);
      toggleReadOnly();
      setMessage({ severity: "success", text: "Tokens updated successfully." });
    } catch (err) {
      setMessage({ severity: "error", text: err.message });
    }
  };

  const toggleReadOnly = () => {
    setReadOnly(readOnly => !readOnly);
  };

  const handleClearTabManager = async () => {
    try {
      await clearTabManager();
      setMessage({ severity: "success", text: "Tab Manager cleared successfully." });
    } catch (err) {
      setMessage({ severity: "error", text: err.message });
    }
  };

  const logoutUser = async () => {
    try {
      await logout();
      await router.push("/");
    } catch (err) {
      setMessage({ severity: "error", text: err.message });
    }
  };

  const openChangePasswordDialog = () => {
    onOpen();
  };

  const handleFormOnChange: React.FormEventHandler<HTMLFormElement> = (e) => {
    const target = e.target as HTMLInputElement;
    setApiTokens((apiTokens) => ({ ...apiTokens, [target.name]: target.value }));
  };


  return (
    <Layout>
      <Box mt={4}>
        <Container maxWidth={"sm"}>

          <Card variant={"outlined"}>

            <CardContent>

              <Box mb={1}>
                <Typography variant={"h5"} align={"center"}><b>MY ACCOUNT</b></Typography>
              </Box>

              <Box mb={1}>
                <form onChange={handleFormOnChange}>
                  <FullWidthTextField label={"Name"} name={"name"} value={user?.name} readOnly={true}/>
                  <FullWidthTextField label={"Username"} name={"username"} value={user?.username} readOnly={true}/>
                </form>
              </Box>

            </CardContent>

            <CardActions>
              <Box px={1} mb={0.5} width={"100%"} textAlign={"center"}>
                <CustomDivider my={1}/>
                <FullWidthButton variant={"info"} my={1} onClick={openChangePasswordDialog}>Change
                  Password</FullWidthButton>
                <FullWidthButton variant={"info"} my={1} onClick={handleClearTabManager}>
                  Clear Tab Manager
                </FullWidthButton>
                <CustomDivider my={1}/>
                <FullWidthButton variant={"danger"} my={1} onClick={logoutUser}>Logout</FullWidthButton>
              </Box>
            </CardActions>

          </Card>

          <Box mt={2}>
            {message.text && (<Alert severity={message.severity as any}>{message.text}</Alert>)}
          </Box>

        </Container>
      </Box>
      <ChangePasswordDialog open={open} onClose={onClose} />
    </Layout>
  );
};


export default Account;
