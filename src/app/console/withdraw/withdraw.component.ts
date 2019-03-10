import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

import { User } from 'src/app/interfaces/user';
import { Account } from 'src/app/interfaces/account';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {

  user: User;
  accounts: Account[];
  account: Account;
  register = false;
  disabled = false;
  buttonDisable = false;
  originAccount;
  toWithdraw: number;

  plataforms = [
    'Paypal', 'Skriller'
  ];

  messages: String[] = [];
  messageNoAccount = 'Para retirar primero debes agregar una cuenta Monedero Electrónico.';
  messageImportant: string;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authenticationService.getStatus()
      .subscribe( (user: User) => {
        this.user = user;
        this.messageImportant = `Importante: La cuenta debe estar registrada a nombre de ${this.user.displayName}.`;
        this.getAccounts();
      }, error => console.log(error) );
  }

  getAccounts() {
    this.userService.getUserAccounts(this.user.uid)
      .subscribe((accounts: Account[]) => {
        if (!accounts.length) {
          this.disabled = true;
          this.addMessageIf();
        } else {
          this.disabled = false;
          this.accounts = accounts;
        }
      }, error => console.log(error));
  }

  changeToRegister() {
    if (this.register) {
      this.register = false;
      this.getAccounts();
      this.removeMessageIf();
      this.removeMessageImportant();
    } else {
      this.register = true;
      this.addMessageImportant();
      this.account = {
        uid: Date.now(),
        accountNumber: 0,
        plataform: ''
      };
    }
  }

  registerAccount() {
    this.userService.registerAccount(this.account, this.user.uid);
    this.changeToRegister();
  }

  withdraw() {
    if (!this.originAccount || !this.toWithdraw) {
      alert('Seleccione una cuenta o cantidad a retirar');
    } else {
      alert('Solicitud de retiro realizada.');
    }
  }

  addMessageIf() {
    if (this.messages.indexOf(this.messageNoAccount) === -1) {
      this.messages.push(this.messageNoAccount);
    }
  }

  removeMessageIf() {
    if (this.messages.indexOf(this.messageNoAccount) > -1) {
      this.messages.splice(
        this.messages.indexOf(this.messageNoAccount), 1);
    }
  }

  addMessageImportant() {
    if (this.messages.indexOf(this.messageImportant) === -1) {
      this.messages.push(this.messageImportant);
    }
  }

  removeMessageImportant() {
    if (this.messages.indexOf(this.messageImportant) > -1) {
      this.messages.splice(
        this.messages.indexOf(this.messageImportant), 1);
    }
  }

}
