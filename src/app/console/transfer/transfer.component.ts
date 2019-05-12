import { Component, Input, OnInit, ViewChild, NgZone, EventEmitter, Output } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';

import { User } from '../../interfaces/user';
import { Account } from '../../interfaces/account';
import { Operation } from '../../interfaces/operation';

// ES6 Modules or TypeScript
import swal from 'sweetalert2';
import { Location } from '@angular/common';

import { take } from 'rxjs/operators';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  @Input() public currentUser: User;
  accounts: Account[];
  disabled = false;
  showAlert = false;
  buttonDisable = false;
  originAccount;
  destinationAccount;
  toTransfer: number;
  comment: string;
  subscribeAccount: any;
  subscribeUser: any;

  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  @Output() view = new EventEmitter<String>();

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
    public location: Location,
    private ngZone: NgZone) { }

  ngOnInit() { }

  getAccounts() {
    this.subscribeAccount = this.userService.getUserAccounts(this.currentUser.uid)
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
    const transference: Operation = {
      amount: 1,
      comment: this.comment,
      date: Date.now(),
      destinationAccout: this.destinationAccount,
      originAccount: this.originAccount,
      status: 'Solicitada',
      type: 'Transferencia'
    }
    this.userService.registerOperation(transference, this.currentUser.uid)
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

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  changeView(view: String) {
    this.view.emit(view);
  }

}
