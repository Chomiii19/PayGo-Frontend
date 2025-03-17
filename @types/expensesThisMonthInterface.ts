interface IExpensesThisMonth {
  expenses: {
    type: string;
    totalAmount: number;
    percentage: number;
  }[];
  grandTotal: number;
}

export default IExpensesThisMonth;
