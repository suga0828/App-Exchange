import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

import { User } from 'src/app/interfaces/user';
import { Account } from 'src/app/interfaces/account';

// ES6 Modules or TypeScript
import swal from 'sweetalert2';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit, OnDestroy {

  user: User;
  accounts: Account[];
  account: Account;
  register = false;
  disabled = false;
  buttonDisable = false;
  originAccount;
  toWithdraw: number;
  showAlert = false;
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
      }, error => console.log(error) );
  }

  getAccounts() {
    this.subscribeAccount = this.userService.getUserAccounts(this.user.uid)
      .subscribe((accounts: Account[]) => {
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
      }, error => console.log(error));
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
      swal.fire({
        type: 'warning',
        title: 'Seleccione una cuenta de origen y un monto'
      });
    } else {
      swal.fire({
        type: 'success',
        title: 'Solicitud de retiro realizada',
        text: `Su solicitud de retiro de ${this.originAccount} por $${this.toWithdraw} será procesada a la brevedad posible.`,
      });
    }
  }

  ngOnDestroy() {
    this.subscribeAccount.unsubscribe();
    this.subscribeUser.unsubscribe();
  }

}
