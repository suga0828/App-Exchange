import { Account } from './account';

export interface User {
  uid: string;
  displayName: string;
  country?: string;
  birthdate?: Date;
  email: string;
  emailVerified: boolean;
  phoneNumber?: string | null;
  idDocument?: string | null;
  idDocumentImage?: string | null;
  accounts?: Account[];
}

export interface NewUser {
  uid: string;
  displayName: string;
  email: string;
}
