import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';

import { User } from '../interfaces/user';
import { Account  } from '../interfaces/account';
import { Operation } from '../interfaces/operation';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private angularFireDatabase: AngularFireDatabase) {	}

  getUserById(uid: string) {
    return this.angularFireDatabase.object('/users/' + uid).valueChanges();
  }

  getUsers() {
    return this.angularFireDatabase.list('/users/').valueChanges();
  }

  createUser(user: User) {
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }

  editUser(user: User) {
    return this.angularFireDatabase.object('/users/' + user.uid).update(user);
  }

  setIdImage(path: string, uid: string) {
    return this.angularFireDatabase.object('/users/' + uid + '/idDocumentImage').set(path);
  }

  registerAccount(account: Account, uid: string) {
    if(account.email) {
      const cleanEmail = account.email.replace('.', ',') //Firebase don't accept dot in string.
      account.email = cleanEmail;
    }
    return this.angularFireDatabase.object('/accounts/' + uid + '/' + account.date ).set(account);
  }

  getUserAccounts(uid: string) {
    return this.angularFireDatabase.list('/accounts/' + uid).valueChanges();
  }

  registerOperation(op: Operation, uid: string) {
    return this.angularFireDatabase.object('/operations/' + uid + '/' + op.date).set(op);
  }

  deleteOperation(date: number, uid: string) {
    return this.angularFireDatabase.object('/operations/' + uid + date).remove();
  }

  getUserOperations(uid: string) {
    return this.angularFireDatabase.list('/operations/' + uid).valueChanges();
  }

  getOperation(uid: string, date: number) {
    return this.angularFireDatabase.list('/operations/' + uid + date).valueChanges();
  }

  getPlataforms() {
    return this.angularFireDatabase.list('/plataforms/').valueChanges();
  }

  registerPlataform(plataform: string, id: number) {
    return this.angularFireDatabase.object('/plataforms/' + id).set(plataform);
  }
  
}
