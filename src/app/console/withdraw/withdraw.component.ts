import { Component, Input, OnInit, ViewChild, NgZone, EventEmitter, Output } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

import { UserService } from '../../services/user.service';

import { User } from '../../interfaces/user';
import { Operation } from '../../interfaces/operation';
import { Account } from '../../interfaces/account';

// ES6 Modules or TypeScript
import swal from 'sweetalert2';

import {take} from 'rxjs/operators';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {

  @Input() public currentUser: User;
  @Output() view = new EventEmitter<String>();
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  
  accounts: Account[];
  
  originAccount;
  toWithdraw: number;
  comment: string;
  
  disabled = false;

  typeAccounts = {
    plataform: 'Monedero Electrónico',
    banking: 'Cuenta Bancaria'
  };

  constructor(
    private userService: UserService,
    private ngZone: NgZone) { }

  ngOnInit() {
    this.getAccounts();
  }

  getAccounts() {
    this.userService.getUserAccounts(this.currentUser.uid)
      .subscribe( (accounts: Account[]) => {
        this.accounts = accounts;
        if (!accounts.length) {
          this.disabled = true;
          swal.fire({
            type: 'warning',
            title: 'No tiene cuentas registradas',
            text: 'Para retirar primero debes agregar una cuenta'
          });
        }
      }, error => console.log(error) );
  }
               
  withdraw() {
    if (!this.originAccount || !this.toWithdraw) {
      swal.fire({
        type: 'warning',
        title: 'Seleccione una cuenta de origen y un monto a retirar'
      });
      return;
    }
    const withdraw: Operation = {
      amount: this.toWithdraw,
      comment: this.comment || '',
      date: Date.now(),
      originAccount: this.originAccount,
      status: 'En proceso',
      type: 'Retiro'
    }
    this.userService.registerOperation(withdraw, this.currentUser.uid)
      .then(r => {
        swal.fire({
          type: 'success',
          title: 'Solicitud de retiro realizada',
          text: `Su solicitud de retiro será procesada a la brevedad posible.`,
        });
        this.toWithdraw = null;
        this.originAccount = '';
        this.comment = '';
        this.changeView('historicalView');
      })
      .catch(error => {
        console.log(error)
        swal.fire({
          type: 'error',
          title: 'Ocurrió un error registrando su retiro'
        });
      });
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  changeView(view: String) {
    this.view.emit(view);
  }
}
