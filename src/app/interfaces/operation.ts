import { Account } from './account';

export interface Operation {
  amount: number;
  comment?: string;
  date: number;
  destinationAccount?: Account;
  originAccount: Account;
  status: string;
  toReceive: number;
  type: string;
  uid: string;
  voucherImage?: string;
  voucherAdminImage?: string;

  filter?(): any;
}
