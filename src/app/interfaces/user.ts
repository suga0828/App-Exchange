import { AccountPlataform, AccountBanking } from './account';

export interface User {
  uid: string;
  displayName: string;
  country?: any;
  birthdate?: any;
  email: string;
  emailVerified: boolean;
  phoneNumber?: any | null;
  idDocument?: any | null;
  idDocumentImage?: string | null;
  accounts?: (AccountPlataform | AccountBanking)[];
}

export interface NewUser {
  uid: string;
  displayName: string;
  email: string;
}
