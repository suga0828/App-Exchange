import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';

import { User } from '../../interfaces/user';
import { Account } from '../../interfaces/account';
import { Transference } from '../../interfaces/operation';

// ES6 Modules or TypeScript
import swal from 'sweetalert2';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit, OnDestroy {

  user: User;
  accounts: Account[];
  account: Account;
  register = false;
  disabled = false;
  showAlert = false;
  buttonDisable = false;
  originAccount;
  destinationAccount;
  subscribeAccount: any;
  subscribeUser: any;

  plataforms = [
   'Paypal', 'Skriller'
  ];

  messages = '';
  messageNoAccount = 'Para transferir primero debes agregar una cuenta Monedero Electrónico.';
  messageImportant: string;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.subscribeUser = this.authenticationService.getStatus()
      .subscribe( (user: User) => {
        this.user = user;
        this.messageImportant = `Importante: La cuenta debe estar registrada a nombre de ${this.user.displayName}.`;
        this.getAccounts();
      }, error => console.log(error));
  }

  getAccounts() {
    this.subscribeAccount = this.userService.getUserAccounts(this.user.uid)
      .subscribe( (accounts: Account[]) => {
        if (!accounts.length) {
          this.disabled = true;
          if (!this.showAlert) {
            swal.fire({
              type: 'warning',
              title: 'No tiene cuentas registradas',
              text: this.messageNoAccount,
            });
          this.showAlert = true;
          }
        } else {
          this.disabled = false;
          this.showAlert = true;
          this.accounts = accounts;
        }
      }, error => console.log(error) );
  }

  changeToRegister() {
    if (this.register) {
      this.register = false;
      this.getAccounts();
      this.messages = '';
    } else {
      this.register = true;
      this.messages = this.messageImportant
      this.account = {
        id: '',
        numberAccount: null,
        plataform: ''
      };
    }
  }

  registerAccount() {
    const account: Account = {
      id: `${this.account.plataform}:${this.account.numberAccount}`,
      numberAccount: this.account.numberAccount,
      plataform: this.account.plataform
    }
    this.userService.registerAccount(account, this.user.uid);
    this.changeToRegister();
  }

  transfer() {
    if (!this.originAccount || !this.destinationAccount) {
      swal.fire({
        type: 'warning',
        title: 'Seleccione una cuenta de origen y una de destino'
      });
      return;
    }
    const transference: Transference = {
      amount: 1,
      date: Date.now(),
      destinationAccout: this.destinationAccount,
      originAccount: this.originAccount,
      type: 'Transference'
    }
    this.userService.registerTransfer(transference, this.user.uid)
      .then( r => {
        swal.fire({
          type: 'success',
          title: 'Solicitud de transferencia realizada',
          text: `Su solicitud de transferencia de ${this.originAccount} a ${this.destinationAccount} será procesada a la brevedad posible.`,
        });
      })
      .catch( error => {
        console.log(error)
        swal.fire({
          type: 'error',
          title: 'Ocurrió un error registrando su cuenta'
        });
      });
  }

  ngOnDestroy() {
    this.subscribeAccount.unsubscribe();
    this.subscribeUser.unsubscribe();
  }

}
