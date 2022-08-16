import React, {createContext, useEffect, useState} from "react";
import {addDays} from "date-fns";
import axios from "axios";

import {User} from "../../models/User";

import localStore from "../localStore";
import {kLocalStoreKey, kStore} from "../constants";
import {UserDetails} from "../types";

interface Endpoint{
  url: string,
  token: string
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);


  /*
  * Side effects
  * */

  useEffect(() => {
    refreshLogin().catch((err) => logout());
  }, []);


  /*
  * Utility functions
  * */


  const signup = async (name: string, username: string, password: string) => {
    const res = await axios.post(`${kStore.BASE_URL}/signup`, { name, username, password });
    if (res.status !== 201) {
      throw new Error(res.data.message);
    }
  };


  const login = async (username: string, password: string) => {
    const res = await axios.post(`${kStore.BASE_URL}/login`, { username, password });

    if (res.status !== 200) {
      throw new Error(res.data.message);
    }

    const userDetails: UserDetails = {
      name: res.data.data.name,
      username: res.data.data.username,
      token: res.data.data.token,
      tokenExpirationDate: addDays(Date.now(), Number(res.data.data.expiresInDays)),
      widgetEndpoints: res.data.data.widgetEndpoints || {}
    };
    await localStore.setItem(kLocalStoreKey.USER_DETAILS, userDetails);
    const user = new User(userDetails.name, userDetails.username, userDetails.token, userDetails.widgetEndpoints);
    setUser(user);

  };


  const refreshLogin = async () => {
    const userDetails: UserDetails | null = await localStore.getItem(kLocalStoreKey.USER_DETAILS);

    if (userDetails === null) {
      await logout();
      return;
    }

    if ((new Date()) > (new Date(userDetails.tokenExpirationDate))) {
      await logout();
      return;
    }

    const user = new User(userDetails.name, userDetails.username, userDetails.token, userDetails.widgetEndpoints);
    setUser(user);
  };


  const logout = async () => {
    await localStore.removeItem(kLocalStoreKey.USER_DETAILS);
    setUser(null);
  };


  const isAuthenticated = () => {
    return user !== null;
  };


  const changePassword = async (newPassword: string) => {
    const res = await axios.post(`${kStore.BASE_URL}/api/change-password`, { newPassword }, {
      headers: {
        Authorization: user?.token
      }
    });
    if (res.status !== 200) {
      throw new Error(res.data.message);
    }
  };


  const fetchApiTokens = async () => {
    const res = await axios.get(`${kStore.BASE_URL}/api/api-tokens`, {
      headers: {
        Authorization: user?.token
      }
    });
    if (res.status !== 200) {
      throw new Error(res.data.message);
    }
    return res.data.data;
  };


  const updateApiTokens = async (apiTokens: Record<string, string>) => {
    const data = { apiTokens };
    const res = await axios.post(`${kStore.BASE_URL}/api/update-api-tokens`, data, {
      headers: {
        Authorization: user?.token
      }
    });
    if (res.status !== 200) {
      throw new Error(res.data.message);
    }
  };
  //TODO: update this function to accomodate saving
  interface Endpoint{
    url: string;
    token: string;
  }
  const addWidgetEndpoints = async (endpoints:Endpoint[]) => {
    const body = {
      endpoints: endpoints
    }
    const res = await axios.post(`${kStore.BASE_URL}/api/widget-endpoints`, body, {
      headers: {
        Authorization: user?.token
      }
    });
    if (res.status !== 200) {
      throw new Error(res.data.message);
    }
  }

  const getWidgetEndpoints = async() => {
    console.log("received the request to get endpoints")
    const res = await axios.get(`${kStore.BASE_URL}/api/widget-endpoints`, {
      headers: {
        Authorization: user?.token
      }
    });
    if (res.status !== 200) {
      throw new Error(res.data.message);
    }
    console.log("Endpoints:", res.data.data.endpoints)
    return res.data.data.endpoints
  }

  const deleteWidgetEndpoint = async(endpoint : {url: string, token:string}) => {
    const res = await axios.post(`${kStore.BASE_URL}/api/widget-endpoints`, endpoint, {
      headers: {
        Authorization: user?.token
      }
    });
    if (res.status !== 200) {
      throw new Error(res.data.message);
    }
  }
  const deleteAllWidgetEndpoints = async() => {
    const res = await axios.post(`${kStore.BASE_URL}/api/delete-widget-endpoints`, {
      headers: {
        Authorization: user?.token
      }
    });
    if (res.status !== 200) {
      throw new Error(res.data.message);
    }
  }
  return {
    user,
    signup,
    login,
    logout,
    isAuthenticated,
    changePassword,
    fetchApiTokens,
    updateApiTokens,
    addWidgetEndpoints,
    getWidgetEndpoints,
    deleteWidgetEndpoint,
    deleteAllWidgetEndpoints
  };
};


const AuthContext = createContext<ReturnType<typeof useAuth>>(
  {
    user: null,
    signup: async () => {},
    login: async () => {},
    logout: async () => {},
    isAuthenticated: () => false,
    changePassword: async () => {},
    fetchApiTokens: async () => {},
    updateApiTokens: async () => {},
    addWidgetEndpoints: async () => {},
    getWidgetEndpoints: async () => [],
    deleteAllWidgetEndpoints: async () => {},
    deleteWidgetEndpoint: async () => {}
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
