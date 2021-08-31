import React, { createContext, useState } from "react";
import { addDays } from "date-fns";
import axios from "axios";

import { User } from "../../models/User";

import localStore from "../localStore";
import { kStore } from "../constants";


const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);


  // TODO Add useEffect hook to listen to auth state.

  /*
  * Utility functions
  * */


  const signup = async (username: string, password: string) => {
    const res = await axios.post(`${kStore.BASE_URL}/signup`, { username, password });
    if (res.status !== 201) {
      new Error("Unknown error occurred.");
    }
  };


  const login = async (username: string, password: string) => {
    const res = await axios.post(`${kStore.BASE_URL}/login`, { username, password });
    if (res.status === 200) {
      const token = res.data.data.token.token;
      const tokenExpirationDate = addDays(Date.now(), Number(res.data.data.token.expiresInDays));
      await localStore.setItem("token", token);
      await localStore.setItem("tokenExpirationDate", tokenExpirationDate);
    } else {
      new Error("Unknown error occurred.");
    }
  };


  const logout = () => {

  };


  const isAuthenticated = () => {

  };


  return { user, signup, login, logout, isAuthenticated };
};


const AuthContext = createContext<ReturnType<typeof useAuth>>(
  {
    user: null,
    signup: async () => {},
    login: async () => {},
    logout: () => {},
    isAuthenticated: () => false,
  }
);


const AuthContextProvider: React.FC = ({ children }) => {

  const value = useAuth();

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );

};


export default AuthContextProvider;
export { AuthContext };
