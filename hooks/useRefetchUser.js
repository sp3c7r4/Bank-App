import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useRefetchUser = (setIsLoading) => {
  const { currentUser, dispatch } = useContext(UserContext)
  const [error, setError] = useState(null);

  const refetchUser = async () => {
    if (!currentUser) return; // Only proceed if there's a user
    try {
      setIsLoading(true);
      console.log("Refetching user...");

      const response = await axios.post(
        `https://api.montrealtriustfinancial.online/auth/refresh`,
        {
          email: currentUser?.email.toLowerCase(),
        }
      );

      if (JSON.stringify(currentUser) !== JSON.stringify(response.data)) {
        dispatch({type: "refetch", payload: response.data}); // Update user if data is different
      }
    } catch (err) {
      setError(err.message);
      console.error("Error refetching user:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Return the refetch function along with loading and error state
  return { refetchUser, error };
};

export default useRefetchUser;
