import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { Plataform } from '../../interfaces/plataform';

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

  sender: Calculate = {
    plataform: {
      name: '',
      tax: null,
      id: null
    },
    amount: null
  }
  receiver = {
    plataform: {
      name: '',
      tax: null,
      id: null
    },
    amount: null
  }

  tax: number;
  comission: number;

  plataforms: Plataform[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getPlataforms();
  }

  getPlataforms() {
    this.userService.getPlataforms()
      .subscribe( (plataforms: Plataform[]) => {
        this.plataforms = plataforms;
      });
  }

  calculateShipping() {
    this.receiver.amount = Number( (this.sender.amount * ( (100 - this.sender.plataform.tax) / 100) ).toFixed(2));

    this.tax = this.sender.plataform.tax;
    this.comission = Number((this.sender.amount - this.receiver.amount).toFixed(2));
  }

  refresh() {
    this.sender = {
      plataform: {
        name: '',
        tax: null,
        id: null
      },
      amount: null
    }
    this.receiver= {
      plataform: {
        name: '',
        tax: null,
        id: null
      },
      amount: null
    }
  }

}
