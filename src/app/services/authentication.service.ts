import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

import { firebase } from 'firebaseui-angular';
import firebaseui from './npm__es_419';

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
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      authMethod: 'https://accounts.google.com',
      clientId: '1014578548907-ata4ckg0ch59tto26g0ik8lpaaljss4d.apps.googleusercontent.com'
    },
  ],
  tosUrl: 'https://suga0828.github.io/App-Exchange/assets/files/termsOfService.pdf',
  privacyPolicyUrl: 'https://suga0828.github.io/App-Exchange/assets/files/privacyPolicy.pdf',
  credentialHelper: firebaseui.auth.CredentialHelper.NONE
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
