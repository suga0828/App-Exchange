import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jumbo',
  templateUrl: './jumbo.component.html',
  styleUrls: ['./jumbo.component.scss']
})
export class JumboComponent implements OnInit {

  tax;
  comissioned;

  constructor() { }

  plataforms = [
    { name: "Skrill (USD)", tax: .12} ,
    { name: "Neteller (USD)", tax: .14 },
    { name: "Paypal (USD)", tax: .11 },
    { name: "Payoneer (USD)", tax: .10 }
  ];

  calculation = {
    sender: {
      plataform: {
        name: '',
        tax: null
      },
      amount: null
    },
    receiver: {
      plataform: {
        name: ''
      },
      amount: null
    },
    comission: null,
  }

  ngOnInit() {
  }

  calculate() {
    this.calculation.comission = this.calculation.sender.plataform.tax;
    this.comissioned = (this.calculation.comission * this.calculation.sender.amount).toFixed(2);
    this.tax = (this.calculation.comission * 100).toFixed(2);
    this.calculation.receiver.amount = (this.calculation.sender.amount - this.comissioned);
  }

  refresh() {
    this.calculation = {
      sender: {
        plataform: {
          name: '',
          tax: null
        },
        amount: null
      },
      receiver: {
        plataform: {
          name: ''
        },
        amount: null
      },
      comission: null
    }
  }

}
