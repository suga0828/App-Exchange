import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';

import { User, NewUser, UserVerified } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private angularFireDatabase: AngularFireDatabase) {	}

  getUserById(uid: string) {
    return this.angularFireDatabase.object('/users/' + uid).valueChanges();
  }

  createUser(user: NewUser) {
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }

  editUser(user: User | UserVerified) {
    return this.angularFireDatabase.object('/users/' + user.uid).update(user);
  }

  setIdImage(path: string, uid: string) {
    return this.angularFireDatabase.object('/users/' + uid + '/idDocumentImage').set(path);
  }

}
