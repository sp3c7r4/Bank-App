import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useRefetchTransactions = (setIsLoading) => {
  const { currentUser, transactions, dispatch } = useContext(UserContext);
  const [error, setError] = useState(null);

  const refetchTransactions = async () => {
    if (!currentUser) return; // Only proceed if there's a user
    try {
        setIsLoading(true);
      const response1 = await axios.post(
        `https://api.montrealtriustfinancial.online/currency/money/transactions`,
        { email: currentUser?.email }
      );
      const response2 = await axios.post(
        `https://api.montrealtriustfinancial.online/currency/crypto/transactions`,
        { email: currentUser?.email }
      );
      const transactions = [...response1.data, ...response2.data];
      dispatch({type: "setTransactions", payload: transactions?.reverse()});
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  // Return the refetch function along with loading and error state
  return { refetchTransactions, error };
};

export default useRefetchTransactions;
