import { Account } from './account';

export interface Operations {
  transference?: Transference;
  withdraw?: Withdraw;
}

export interface Transference {
  amount: number;
  date: number;
  destinationAccout: Account;
  originAccount: Account;
  status: string;
  type: string;
}

export interface Withdraw {
  amount: number;
  date: number;
  originAccount: Account;
  status: string;
  type: string;
}
