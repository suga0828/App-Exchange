import { Component, Input, OnInit, ViewChild, NgZone } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

import { UserService } from '../../services/user.service';

import { User } from '../../interfaces/user';
import { Operation } from '../../interfaces/operation';
import { Account } from '../../interfaces/account';

// ES6 Modules or TypeScript
import swal from 'sweetalert2';
import { Location } from '@angular/common';

import {take} from 'rxjs/operators';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {

  @Input() public currentUser: User;
  accounts: Account[];
  disabled = false;
  buttonDisable = false;
  originAccount;
  toWithdraw: number;
  comment: string;
  showAlert = false;
  subscribeAccount: any;
  subscribeUser: any;

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  messages = '';
  messageNoAccount = 'Para transferir primero debes agregar una cuenta Monedero Electrónico.';
  messageImportant: string;
  typeAccounts = {
    plataform: 'Monedero Electrónico',
    banking: 'Cuenta Bancaria'
  };

  constructor(
    private userService: UserService,
    public location: Location,
    private ngZone: NgZone) { }

  ngOnInit() { }

  getAccounts() {
    this.userService.getUserAccounts(this.currentUser.uid)
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
    const withdraw: Operation = {
      amount: this.toWithdraw,
      comment: this.comment,
      date: Date.now(),
      originAccount: this.originAccount,
      status: 'Solicitada',
      type: 'Retiro'
    }
    this.userService.registerOperation(withdraw, this.currentUser.uid)
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

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

}
