export interface User {
  isAdmin?: boolean;
  isVerified: boolean;
  balance: number;
  uid: string;
  displayName: string;
  country?: any;
  birthdate?: any;
  email?: string;
  phoneNumber?: any | null;
  idDocument?: any | null;
  idDocumentImage?: string | null;
}
