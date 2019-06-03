import { Account } from './account';

export interface Operation {
  amount: number;
  comment?: string;
  date: number;
  destinationAccount?: Account;
  originAccount: Account;
  status: string;
  type: string;
  uid: string;
  voucherImage?: string;
  voucherAdminImage?: string;

  filter?(): any;
}
