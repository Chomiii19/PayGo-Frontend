interface ILoan {
  user?: string;
  type?: string;
  amount?: number;
  balanceRemaining?: number;
  termMonths?: number;
  monthlyPayment?: number;
  interestRate?: number;
  paymentSource?: "checkings" | "savings";
  createdAt?: Date;
  nextDueDate?: Date;
  status?: "active" | "paid";
}

export default ILoan;
