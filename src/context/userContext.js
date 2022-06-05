import { createContext, useContext, useReducer } from "react";
import { userDataReducer } from "../reducer/userDataReducer";

const UserDataContext = createContext(null);

const useUserData = () => useContext(UserDataContext);

const initial_user_data = [];

const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useReducer(
    userDataReducer,
    initial_user_data
  );
  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export { useUserData, UserDataProvider };
