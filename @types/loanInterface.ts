interface ILoan {
  _id: string;
  user?: string;
  type?: string;
  amount: number;
  balanceRemaining?: number;
  termMonths?: number;
  monthlyPayment?: number;
  interestRate?: number;
  paymentSource: "checkings" | "savings";
  termStatus: {
    dueDate: string;
    paid: boolean;
    amount: number;
  }[];
  createdAt?: Date;
  nextDueDate?: Date;
  status?: "active" | "paid";
}

export default ILoan;
