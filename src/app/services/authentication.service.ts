import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

import {firebase, firebaseui} from 'firebaseui-angular';

export const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    {
      scopes: [
        'public_profile',
        'email',
        'user_likes',
        'user_friends'
      ],
      customParameters: {
        'auth_type': 'reauthenticate'
      },
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID
    },
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    {
      requireDisplayName: true,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  tosUrl: 'https://suga0828.github.io/App-Exchange/assets/files/termsOfService.pdf',
  privacyPolicyUrl: 'https://suga0828.github.io/App-Exchange/assets/files/privacyPolicy.pdf',
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  logOut() {
    return this.angularFireAuth.auth.signOut();
  }

  getStatus() {
    return this.angularFireAuth.authState;
  }

}