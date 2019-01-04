import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  user: User;

  cuentas = [
    { plataforma: 'Paypal', nombre: 'Alexander', apellido: 'Sandoval' },
    { plataforma: 'Skriller', nombre: 'Alexander', apellido: 'Sandoval' },
  ];

  messages = [
    'Para transferir primero debes agregar una cuenta Monedero Electrónico.',
  ];

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authenticationService.getStatus()
      .subscribe((user: User) => {
        this.user = user;
        this.messages.push(`IMPORTANTE: La cuenta de origen debe estar a nombre de ${this.user.displayName}.`);
      }, error => console.log(error));
  }

}
