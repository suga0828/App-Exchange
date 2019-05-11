import { Account } from './account';

export interface Operation {
  amount: number;
  comment?: string;
  date: number;
  destinationAccout?: Account;
  originAccount: Account;
  status: string;
  type: string;
}
