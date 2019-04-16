import { AccountPlataform, AccountBanking } from './account';

export interface Operations {
  transference?: Transference;
  withdraw?: Withdraw;
}

export interface Transference {
  amount: number;
  date: number;
  destinationAccout: (AccountPlataform | AccountBanking);
  originAccount: (AccountPlataform | AccountBanking);
  type: string;
}

export interface Withdraw {
  amount: number;
  date: number;
  originAccount: (AccountPlataform | AccountBanking);
  type: string;
}
