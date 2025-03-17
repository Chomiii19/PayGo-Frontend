import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import getTokenFromStorage from "../utils/getTokenFromStorage";
import ILoan from "../@types/loanInterface";

interface ActiveLoanContextType {
  pieGraphData: ILoan;
  loading: boolean;
  error: string | null;
  refreshPieGraphData: () => void;
}

const ActiveLoanContext = createContext<ActiveLoanContextType | undefined>(
  undefined
);

export const ActiveLoanProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [pieGraphData, setPieGraphData] = useState<ILoan>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = async () => {
    try {
      const authToken = await getTokenFromStorage();
      const response = await axios.get(
        "https://paygo-backend-1y0p.onrender.com/api/v1/app/active-loan",
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setPieGraphData(response.data.data.activeLoan);
      setError(null);
    } catch (err) {
      setError("Error fetching transactions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <ActiveLoanContext.Provider
      value={{
        pieGraphData,
        refreshPieGraphData: fetchExpenses,
        loading,
        error,
      }}
    >
      {children}
    </ActiveLoanContext.Provider>
  );
};

export const useActiveLoan = () => {
  const context = useContext(ActiveLoanContext);
  if (!context)
    throw new Error("useUser must be used within a TransactionProvider");
  return context;
};
