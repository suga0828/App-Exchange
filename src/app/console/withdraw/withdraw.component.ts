import { Component, Input, OnInit, OnChanges, EventEmitter, Output } from '@angular/core';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { UserService } from '../../services/user.service';

import { Account } from '../../interfaces/account';
import { Operation } from '../../interfaces/operation';
import { Plataform } from '../../interfaces/plataform';
import { User } from '../../interfaces/user';

// ES6 Modules or TypeScript
import swal from 'sweetalert2';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit, OnChanges {

  @Input() public currentUser: User;
  @Output() view = new EventEmitter<String>();
  
  accounts: Account[];
  exchangeRate: any;
  operation: string;
  plataforms: Plataform[];

  withdrawForm: FormGroup;
  
  toReceive = {
    amount: null,
    tax: null,
  }

  messages = [
    'Retira dinero desde tu cuenta bancaria nacional a otra cuenta de otro país (moneda local a monera extranjera).',
    'Retira dinero desde un monedero electrónico a tu cuenta bancaria nacional (dólar a moneda local).',
  ]

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder 
  ) { }

  ngOnInit() {
    this.buildWithdrawForm();
    this.getPlataforms();
    this.getExchangeRate();
  }

  ngOnChanges() {
    this.getAccounts();
  }

  buildWithdrawForm() {
    this.withdrawForm = this.formBuilder.group({
      originAccount: ['', Validators.required],
      amount: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+')
      ])],
      comment: ['', Validators.maxLength(200)]
    });
    this.onChanges();
  }

  get originAccount() {
    return this.withdrawForm.get('originAccount');
  }

  get amount() {
    return this.withdrawForm.get('amount');
  }

  get comment() {
    return this.withdrawForm.get('comment');
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
              text: 'Para retirar primero debes agregar una cuenta'
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

  getExchangeRate() {
    this.userService.getExchangeRate()
      .subscribe(rate => {
        this.exchangeRate = rate;
      }, error => console.error(error));
  }

  onChanges(): void {
    this.originAccount.valueChanges
      .subscribe( () => {
        this.detailedOperation();
      });
    this.amount.valueChanges
      .subscribe( () => {
        this.detailedOperation();
      });
  }

  detailedOperation() {
    if (!this.originAccount.value || !this.amount.value) {
      return;
    }
    this.operation = `${this.originAccount.value.type}`;
    if (this.operation === 'Monedero Electrónico') {
      for (let i = 0; i < this.plataforms.length; i++) {
        if (this.plataforms[i].name === this.originAccount.value.plataform) {
          this.toReceive.tax = this.plataforms[i].tax;
          this.toReceive.amount = ( this.amount.value * this.exchangeRate * ((100 - this.toReceive.tax) / 100) ).toFixed(2);
        }
      }
    }
    if (this.operation === 'Cuenta Bancaria') {
      this.toReceive.amount = ( this.amount.value / this.exchangeRate ).toFixed(2);
    }
  }
               
  onSubmit() {
    if (!this.originAccount.value || !this.amount.value) {
      swal.fire({
        type: 'warning',
        title: 'Seleccione una cuenta de origen y un monto a retirar'
      });
      return;
    }
    const withdraw: Operation = {
      amount: this.amount.value,
      comment: this.comment.value,
      date: Date.now(),
      originAccount: this.originAccount.value,
      status: 'Solicitada',
      toReceive: this.toReceive.amount,
      type: 'Retiro',
      uid: this.currentUser.uid
    }
    this.userService.registerOperation(withdraw)
      .then(r => {
        swal.fire({
          type: 'success',
          title: 'Solicitud de retiro realizada',
          text: `Su solicitud de retiro será procesada a la brevedad posible.`,
        });
        this.changeView('historicalView');
      })
      .catch(error => {
        console.error(error)
        swal.fire({
          type: 'error',
          title: 'Ocurrió un error registrando su retiro'
        });
      });
  }

  changeView(view: String) {
    this.view.emit(view);
  }
}
