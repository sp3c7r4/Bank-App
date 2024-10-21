import { createContext, useContext, useReducer } from "react";

export const UserContext = createContext();
const initialState = {
  currentUser: null,
  isLoading: false,
  userPin: "",
  pinPage: false,
  otpPage: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, currentUser: action.payload, isLoading: false };
    case "setLoader":
      return { ...state, isLoading: action.payload };
    case "setPin":
      return { ...state, userPin: action.payload };
    case "refetch":
      return { ...state, currentUser: action.payload };
    case "setPinPage":
      return { ...state, pinPage: action.payload };
    case "setOtpPage":
      return { ...state, otpPage: action.payload };
  }
}
function UserContextProvider({ children }) {
  const [{ currentUser, isLoading, userPin, pinPage, otpPage }, dispatch] =
    useReducer(reducer, initialState);
  return (
    <UserContext.Provider
      value={{ currentUser, isLoading, dispatch, userPin, pinPage, otpPage }}
    >
      {children}
    </UserContext.Provider>
  );
}
export default UserContextProvider;
