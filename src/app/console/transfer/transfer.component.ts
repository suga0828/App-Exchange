import { Component, Input, OnInit, OnChanges, EventEmitter, Output } from '@angular/core';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { UserService } from '../../services/user.service';

import { Account } from '../../interfaces/account';
import { Operation } from '../../interfaces/operation';
import { Plataform } from '../../interfaces/plataform';
import { User } from '../../interfaces/user';
import { Rate } from '../../interfaces/rate';

// ES6 Modules or TypeScript
import swal from 'sweetalert2';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit, OnChanges {

  @Input() public currentUser: User;
  @Output() view = new EventEmitter<String>();

  accounts: Account[];
  exchangeRates: Rate[];
  exchangeRate: Rate;
  operation: string;
  plataforms: Plataform[];
  
  transferForm: FormGroup;

  toReceive = {
    amount: null,
    tax: null,
  }
  
  messages = [
    'Transfiere dinero desde tu cuenta bancaria nacional a un monedero electrónico (moneda local a dólar).',
    'Transfiere dinero desde un monedero electrónico a otro (dólar a dólar).',
    'Transfiere dinero desde un monedero electrónico a tu cuenta bancaria nacional (dólar a moneda local).',
  ]

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder  
  ) { }

  ngOnInit() {
    this.buildTransferForm();
    this.getPlataforms();
    this.getExchangeRates();
  }

  ngOnChanges() {
    this.getAccounts();
  }

  buildTransferForm() {
    this.transferForm = this.formBuilder.group({
      originAccount: ['', Validators.required],
      destinationAccount: ['', Validators.required],
      amount: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+')
      ])],
      comment: ['', Validators.maxLength(200)]
    });
    this.onChanges();
  }

  get originAccount() {
    return this.transferForm.get('originAccount');
  }

  get destinationAccount() {
    return this.transferForm.get('destinationAccount');
  }

  get amount() {
    return this.transferForm.get('amount');
  }

  get comment() {
    return this.transferForm.get('comment');
  }

  getAccounts() {
    if (this.currentUser) {
      this.userService.getUserAccounts(this.currentUser.uid)
        .subscribe( (accounts: Account[]) => {
          this.accounts = accounts;
          if (!accounts.length) {
            swal.fire({
              type: 'warning',
              title: 'No tiene cuentas registradas',
              text: 'Para transferir primero debes agregar una cuenta.'
            });
          }
        }, error => console.error(error) );
    }
  }

  getPlataforms() {
    this.userService.getPlataforms()
      .subscribe((plataforms: Plataform[]) => {
        this.plataforms = plataforms;
      }, error => console.error(error));
  }

  getExchangeRates() {
    this.userService.getExchangeRates()
      .subscribe( (rates: Rate[]) => {
        this.exchangeRates = rates;
      }, error => console.error(error));
  }

  onChanges(): void {
    this.originAccount.valueChanges
      .subscribe( () => {
        this.detailedOperation();
      });
    this.destinationAccount.valueChanges
      .subscribe( () => {
        this.detailedOperation();
      });
    this.amount.valueChanges
      .subscribe( () => {
        this.detailedOperation();
      });
  }

  detailedOperation() {
    if (!this.originAccount.value || !this.amount.value || !this.destinationAccount.value) {
      return;
    }

    const currencyFrom = this.originAccount.value.currency;
    const currencyTo = this.destinationAccount.value.currency;
    this.exchangeRate = this.exchangeRates.find(el => {
      return el.currencyFrom === currencyFrom && el.currencyTo === currencyTo;
    });

    const plataformName = this.originAccount.value.plataform;
    const plataformEntity = this.originAccount.value.entity;
    this.toReceive.tax = this.plataforms.find(el => el.name === plataformName || el.name === plataformEntity).tax;
    if (this.exchangeRate) {
      this.toReceive.amount = (this.amount.value * this.exchangeRate.value * ((100 - this.toReceive.tax) / 100)).toFixed(2);
    } else {
      this.toReceive.amount = (this.amount.value * ((100 - this.toReceive.tax) / 100)).toFixed(2);
    }
  }

  onSubmit() {
    if (!this.originAccount.value || !this.destinationAccount.value || !this.amount.value) {
      swal.fire({
        type: 'warning',
        title: 'Seleccione una cuenta de origen, una de destino y un monto'
      });
      return;
    }
    const transference: Operation = {
      amount: this.amount.value,
      comment: this.comment.value,
      date: Date.now(),
      destinationAccount: this.destinationAccount.value,
      originAccount: this.originAccount.value,
      status: 'Solicitada',
      toReceive: this.toReceive.amount,
      type: 'Transferencia',
      uid: this.currentUser.uid
    }
    this.userService.registerOperation(transference)
      .then( r => {
        const msj = `Administración le contactará a la brevedad. Puede ver y seguir el estado de su operación en <b>Historial</b>`;
        swal.fire({
          html: msj,
          type: 'success',
          title: 'Solicitud de transferencia realizada',
        });
        this.changeView('historicalView');
      })
      .catch( error => {
        console.error(error)
        swal.fire({
          type: 'error',
          title: 'Ocurrió un error registrando su transferencia'
        });
      });
  }

  changeView(view: String) {
    this.view.emit(view);
  }
}
