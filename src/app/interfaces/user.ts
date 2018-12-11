export interface User {
  uid: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  providerId: string;
  phoneNumber: string | null;
  idDocumentImage: string | null;
}

export interface NewUser {
  uid: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  providerId: string;
}
