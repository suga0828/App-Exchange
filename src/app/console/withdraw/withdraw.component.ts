import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';

import { User } from '../../interfaces/user';
import { Withdraw } from '../../interfaces/operation';
import { Account } from '../../interfaces/account';

// ES6 Modules or TypeScript
import swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit, OnDestroy {

  user: User;
  accounts: Account[];
  disabled = false;
  buttonDisable = false;
  originAccount;
  toWithdraw: number;
  showAlert = false;
  subscribeAccount: any;
  subscribeUser: any;

  messages = '';
  messageNoAccount = 'Para transferir primero debes agregar una cuenta Monedero Electrónico.';
  messageImportant: string;
  typeAccounts = {
    plataform: 'Monedero Electrónico',
    banking: 'Cuenta Bancaria'
  };

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    public location: Location) { }

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
      }, error => console.log(error));
  }

  withdraw() {
    if (!this.originAccount || !this.toWithdraw) {
      swal.fire({
        type: 'warning',
        title: 'Seleccione una cuenta de origen y un monto'
      });
      return;
    }
    const withdraw: Withdraw = {
      amount: this.toWithdraw,
      date: Date.now(),
      originAccount: this.originAccount,
      type: 'Withdraw'
    }
    this.userService.registerWithdraw(withdraw, this.user.uid)
      .then(r => {
        swal.fire({
          type: 'success',
          title: 'Solicitud de retiro realizada',
          text: `Su solicitud de retiro será procesada a la brevedad posible.`,
        });
      })
      .catch(error => {
        console.log(error)
        swal.fire({
          type: 'error',
          title: 'Ocurrió un error registrando su retiro'
        });
      });
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy() {
    this.subscribeAccount.unsubscribe();
    this.subscribeUser.unsubscribe();
  }

}
