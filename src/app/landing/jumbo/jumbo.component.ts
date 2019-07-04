import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { Plataform } from '../../interfaces/plataform';
import { Rate } from '../../interfaces/rate';

interface Calculate {
  plataform: Plataform;
  amount: number;
}

@Component({
  selector: 'app-jumbo',
  templateUrl: './jumbo.component.html',
  styleUrls: ['./jumbo.component.scss']
})
export class JumboComponent implements OnInit {

  originAccount: Plataform;
  destinationAccount: Plataform;
  amount: number;
  toReceive = {
    amount: null,
    tax: null,
    comissioned: null
  };

  exchangeRates: Rate[];
  exchangeRate: Rate;
  plataforms: Plataform[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getPlataforms();
    this.getExchangeRates();
  }

  getPlataforms() {
    this.userService.getPlataforms()
      .subscribe( (plataforms: Plataform[]) => {
        this.plataforms = plataforms;
      });
  }

  getExchangeRates() {
    this.userService.getExchangeRates()
      .subscribe((rates: Rate[]) => {
        this.exchangeRates = rates;
      }, error => console.error(error));
  }

  calculateShipping() {
    if (!this.originAccount || !this.amount || !this.destinationAccount) {
      return;
    }

    const currencyFrom = this.originAccount.currency;
    const currencyTo = this.destinationAccount.currency;
    this.exchangeRate = this.exchangeRates.find(el => {
      return el.currencyFrom === currencyFrom && el.currencyTo === currencyTo;
    });

    const plataformName = this.originAccount.name;
    this.toReceive.tax = this.plataforms.find(el => el.name === plataformName).tax;
    if (this.exchangeRate) {
      this.toReceive.amount = (this.amount * this.exchangeRate.value * ((100 - this.toReceive.tax) / 100)).toFixed(0);
    } else {
      this.toReceive.amount = (this.amount *  ((100 - this.toReceive.tax) / 100)).toFixed(0);
    }
    this.toReceive.comissioned = `${this.amount - this.toReceive.amount} ${currencyTo}`;

  }

  refresh() {
    this.originAccount = null;
    this.amount = null;
    this.destinationAccount = null;
    this.toReceive = {
      amount: null,
      tax: null,
      comissioned: null
    };
  }

}
