import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  user: User;

  cuentas = [
    { plataforma: 'Paypal', nombre: 'Alexander', apellido: 'Sandoval' },
    { plataforma: 'Skriller', nombre: 'Alexander', apellido: 'Sandoval' },
  ];

  messages = [
    'Para retirar primero debes agregar una cuenta Monedero Electrónico.',
  ];

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authenticationService.getStatus()
      .subscribe( (user: User) => {
        this.user = user;
        this.messages.push(`IMPORTANTE: La cuenta de origen debe estar a nombre de ${this.user.displayName}.`);
      }, error => console.log(error) );
  }

}
