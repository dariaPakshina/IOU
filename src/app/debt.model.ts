export interface Debt {
  date: string;
  sum: number;
}

export interface DebtRes {
  id?: number;
  date: string;
  sum: number;
  user?: number;
}
