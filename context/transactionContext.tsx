import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import getTokenFromStorage from "../utils/getTokenFromStorage";
import ITransaction from "../@types/transactionInterface";

interface TransactionContextType {
  transactions: ITransaction[] | [];
  loading: boolean;
  error: string | null;
  refreshTransaction: () => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const TransactionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [transactions, setTransactions] = useState<ITransaction[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    try {
      const authToken = await getTokenFromStorage();
      const response = await axios.get(
        "https://paygo-backend-1y0p.onrender.com/api/v1/app/transaction-history",
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setTransactions(response.data.data);
      setError(null);
    } catch (err) {
      setError("Error fetching transactions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        refreshTransaction: fetchTransactions,
        loading,
        error,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context)
    throw new Error("useUser must be used within a TransactionProvider");
  return context;
};
