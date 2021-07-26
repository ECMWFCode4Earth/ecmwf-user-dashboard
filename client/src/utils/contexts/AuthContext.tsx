import React, { createContext, useState } from "react";

import { User } from "../../models/User";


const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  return { user, setUser };
};


const AuthContext = createContext<ReturnType<typeof useAuth>>(
  { user: null, setUser: () => {} }
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
