import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';

import { User } from '../../interfaces/user';
import { Account } from '../../interfaces/account';
import { Transference } from '../../interfaces/operation';

// ES6 Modules or TypeScript
import swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit, OnDestroy {

  user: User;
  accounts: Account[];
  disabled = false;
  showAlert = false;
  buttonDisable = false;
  originAccount;
  destinationAccount;
  subscribeAccount: any;
  subscribeUser: any;
  messages = '';
  messageNoAccount = 'Para transferir primero debes agregar una cuenta Monedero Electrónico o cuenta Bancaria.';
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
      status: 'Solicitada',
      type: 'Transferencia'
    }
    this.userService.registerTransfer(transference, this.user.uid)
      .then( r => {
        swal.fire({
          type: 'success',
          title: 'Solicitud de transferencia realizada',
          text: `Su solicitud de transferencia será procesada a la brevedad posible.`,
        });
      })
      .catch( error => {
        console.log(error)
        swal.fire({
          type: 'error',
          title: 'Ocurrió un error registrando su transferencia'
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
