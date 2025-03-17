import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import getTokenFromStorage from "../utils/getTokenFromStorage";

import IExpensesThisMonth from "../@types/expensesThisMonthInterface";

interface ExpensesThisMonthContextType {
  expensesThisMonthReport: IExpensesThisMonth;
  loading: boolean;
  error: string | null;
  refreshExpensesThisMonthReport: () => void;
}

const ExpensesThisMonthContext = createContext<
  ExpensesThisMonthContextType | undefined
>(undefined);

export const ExpensesThisMonthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [expensesThisMonthReport, setExpensesThisMonthReport] =
    useState<IExpensesThisMonth>({ expenses: [], grandTotal: 0 });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = async () => {
    try {
      const authToken = await getTokenFromStorage();
      const response = await axios.get(
        "https://paygo-backend-1y0p.onrender.com/api/v1/app/expenses/this-month",
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setExpensesThisMonthReport(response.data.data);
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
    <ExpensesThisMonthContext.Provider
      value={{
        expensesThisMonthReport,
        refreshExpensesThisMonthReport: fetchExpenses,
        loading,
        error,
      }}
    >
      {children}
    </ExpensesThisMonthContext.Provider>
  );
};

export const useExpensesThisMonth = () => {
  const context = useContext(ExpensesThisMonthContext);
  if (!context)
    throw new Error("useUser must be used within a TransactionProvider");
  return context;
};
