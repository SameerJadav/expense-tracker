export type User = {
  name: string;
  email: string;
  userID: string;
  avatarURL: string;
};

export type Expense = {
  userID: string;
  title: string;
  amount: number;
  date: string;
};
