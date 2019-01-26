import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

import { User } from 'src/app/interfaces/user';
import { Account } from 'src/app/interfaces/account';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  user: User;
  accounts: Account[];
  account: Account;
  register = false;
  disabled = false;
  buttonDisable = false;
  originAccount;
  destinationAccount;

  cuentas = [
    { plataforma: 'Paypal', nombre: 'Alexander', apellido: 'Sandoval' },
    { plataforma: 'Skriller', nombre: 'Alexander', apellido: 'Sandoval' },
  ];

  plataforms = [
   'Paypal', 'Skriller'
  ];

  messages: String[] = [];
  messageNoAccount = 'Para transferir primero debes agregar una cuenta Monedero Electrónico.';
  messageImportant: string;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authenticationService.getStatus()
      .subscribe((user: User) => {
        this.user = user;
        this.messageImportant = `Importante: La cuenta debe estar registrada a nombre de ${this.user.displayName}.`;
        this.getAccounts();
      }, error => console.log(error));
  }

  getAccounts() {
    this.userService.getUserAccounts(this.user.uid)
      .subscribe( (accounts: Account[]) => {
        if (!accounts.length) {
          this.disabled = true;
          this.addMessageIf();
        } else {
          this.disabled = false;
          this.accounts = accounts;
        }
      }, error => console.log(error) );
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
        plataform: '' };
    }
  }

  registerAccount() {
    this.userService.registerAccount(this.account, this.user.uid);
    this.changeToRegister();
  }

  transfer() {
    if (!this.originAccount || !this.destinationAccount) {
      alert('Seleccione una cuenta');
    } else {
      alert('Solicitud de transferencia realizada');
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
