import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';

import { User, NewUser } from '../interfaces/user';
import { Account  } from '../interfaces/account';
import { Transference, Withdraw } from '../interfaces/operation';

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
    return this.angularFireDatabase.object('/users/' + uid + '/accounts/' + account.id ).set(account);
  }

  getUserAccounts(uid: string) {
    return this.angularFireDatabase.list('/users/' + uid + '/accounts/').valueChanges();
  }

  registerTransfer(transfer: Transference, uid: string) {
    return this.angularFireDatabase.object('/users/' + uid + '/operations/' + transfer.date).set(transfer);
  }

  registerWithdraw(withdraw: Withdraw, uid: string) {
    return this.angularFireDatabase.object('/users/' + uid + '/operations/' + withdraw.date).set(withdraw);
  }

  getUserOperations(uid: string) {
    return this.angularFireDatabase.list('/users/' + uid + '/operations/').valueChanges();
  }

}
