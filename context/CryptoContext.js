import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";  // Don't forget to import axios

export const CryptoContext = createContext();

const initialState = {
  allCryptoCurrencies: [],
  cryptoInView: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "setCryptoCurrencies":
      return { ...state, allCryptoCurrencies: action.payload };
    case "setCryptoInView":
      return { ...state, cryptoInView: action.payload };
    default:
      return state;
  }
}

function CryptoContextProvider({ children }) {
  const [{ allCryptoCurrencies, cryptoInView }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 5;

    async function fetchCryptoCurrencies() {
      try {
        console.log("fetching");
        const capCryptoRes = await axios.get(
          "https://api.coincap.io/v2/assets"
        );
        const data = capCryptoRes.data.data;
        if (data && data.length > 0) {
          dispatch({ type: "setCryptoCurrencies", payload: data });
        } else {
          throw new Error("No cryptocurrencies found");
        }
      } catch (error) {
        retryCount++;
        console.error("Failed to load cryptocurrencies.", error);
        if (retryCount <= maxRetries && allCryptoCurrencies.length === 0) {
          console.log(`Retrying (${retryCount})...`);
          fetchCryptoCurrencies(); // Retry if failed
        }
      }
    }

    if (cryptoInView && allCryptoCurrencies.length === 0) {
      fetchCryptoCurrencies();
    }

  }, [cryptoInView, allCryptoCurrencies]);

  return (
    <CryptoContext.Provider value={{ allCryptoCurrencies, dispatch }}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContextProvider;
