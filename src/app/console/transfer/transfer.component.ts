import { Component, Input, OnInit, ViewChild, NgZone, EventEmitter, Output } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

import { UserService } from '../../services/user.service';

import { User } from '../../interfaces/user';
import { Account } from '../../interfaces/account';
import { Operation } from '../../interfaces/operation';

// ES6 Modules or TypeScript
import swal from 'sweetalert2';

import { take } from 'rxjs/operators';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  @Input() public currentUser: User;
  @Output() view = new EventEmitter<String>();
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  accounts: Account[];
  
  originAccount;
  destinationAccount;
  toTransfer: number;
  comment: string;
  
  disabled = false;

  typeAccounts = {
    plataform: 'Monedero Electrónico',
    banking: 'Cuenta Bancaria'
  }

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
            text: 'Para transferir primero debes agregar una cuenta.'
          });
        }
      }, error => console.log(error) );
  }

  transfer() {
    if (!this.originAccount || !this.destinationAccount || !this.toTransfer) {
      swal.fire({
        type: 'warning',
        title: 'Seleccione una cuenta de origen, una de destino y un monto'
      });
      return;
    }
    const transference: Operation = {
      amount: this.toTransfer,
      comment: this.comment || '',
      date: Date.now(),
      destinationAccout: this.destinationAccount,
      originAccount: this.originAccount,
      status: 'En proceso',
      type: 'Transferencia'
    }
    this.userService.registerOperation(transference, this.currentUser.uid)
      .then( r => {
        swal.fire({
          type: 'success',
          title: 'Solicitud de transferencia realizada',
          text: `Su solicitud de transferencia será procesada a la brevedad posible.`,
        });
        this.originAccount = '';
        this.destinationAccount = '';
        this.toTransfer = null;
        this.comment = '';
        this.changeView('historicalView');
      })
      .catch( error => {
        console.log(error)
        swal.fire({
          type: 'error',
          title: 'Ocurrió un error registrando su transferencia'
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
