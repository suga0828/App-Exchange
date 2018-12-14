export interface User {
  uid: string;
  displayName: string;
  country?: string;
  birthdate?: Date;
  email: string;
  emailVerified: string;
  providerId: string;
  phoneNumber?: string | null;
  idDocument?: string | null;
  idDocumentImage?: string | null;
}

export interface NewUser {
  uid: string;
  displayName: string;
  email: string;
  emailVerified: string;
  providerId: string;
}

export interface UserVerified {
  uid: string;
  emailVerified: string;
}
