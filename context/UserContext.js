import { createContext, useContext, useReducer } from "react";

export const UserContext = createContext()
const initialState = {
    currentUser: null,
    isLoading: false
}
function reducer(state, action){
    switch (action.type){
        case "login":
            return { ...state, currentUser: action.payload, isLoading: false }
        case "setLoader":
            return { ...state, isLoading: false }
    }
}
function UserContextProvider({children}){
    const [{currentUser, isLoading}, dispatch] = useReducer(reducer, initialState)
    return(
        <UserContext.Provider value={{currentUser, isLoading, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContextProvider;
