import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { User } from '../../interfaces/user';
import { GetCountriesService } from 'src/app/services/get-countries.service';
import { Country } from 'src/app/interfaces/country';

import { AngularFireStorage } from '@angular/fire/storage';

// ES6 Modules or TypeScript
import swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User;
  messages: String;

  edit = false;
  disabled = false;
  updateImage = false;
  showAlert = false;
  userImage: any;
  countries: Country[];

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService,
    private firebaseStorage: AngularFireStorage,
    private countriesService: GetCountriesService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authenticationService.getStatus()
      .subscribe( response => {
        const currentUser = response;
        if (currentUser) {
          if (currentUser.providerData[0].providerId === 'password' && currentUser.emailVerified !== true) {
            const newMessage = 'Por favor verifique su correo electrónico o inicie sesión nuevamente';
            swal.fire({
              type: 'warning',
              title: 'No tiene cuentas registradas',
              text: newMessage,
            });
          }
        }
        this.userService.getUserById(currentUser.uid)
          .subscribe( (user: User) => {
            this.user = user;
            if ( Object.keys(this.user).length < 8 ) {
              if (!this.showAlert) {
                swal.fire({
                  type: 'warning',
                  title: 'Por favor complete todos los campos solicitados',
                });
              }
            } else {
              this.showAlert = true;
            }
            this.countriesService.getCountries()
              .subscribe( (countries: Country[]) => {
                this.countries = countries;
              });
          }, error => console.log(error)
          );
      });
  }

  changeToEdit() {
    this.edit = !this.edit;
    this.updateImage = false;
  }

  saveImage() {
    const currentPictureId = Date.now();
    const pictures = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').putString(this.userImage, 'data_url');
    pictures.then( () => {
      this.userImage = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL();
      this.userImage.subscribe( (path: string) => {
        this.userService.setIdImage(path, this.user.uid)
          .then( () => {
            swal.fire({
              type: 'success',
              title: 'Datos guardados correctamente'
            });
            this.changeToEdit();
            this.disabled = false;
          }, error => console.log(error) );
      });
    }, error => console.log(error) );
  }

  changeImage(event: any) {
    if (this.edit && !this.updateImage) {
      this.updateImage = true;
    }
    const file = event.target.files[0];
    if(file) {
      if (file.size < 2096000) {
        const reader = new FileReader();
        reader.onload = this.handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
      } else {
        swal.fire({
          type: 'error',
          title: 'Hay un error con el archivo',
          text: 'El tamaño del archivo es muy grande, debe ser menor a 2MB.'
        });
      }
    }
  }

  handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.userImage = 'data:image/png;base64,' + btoa(binaryString);
  }

  save() {
    this.disabled = true;
    if (this.userImage) {
      this.saveUser(this.user);
      this.saveImage();
    } else {
      this.saveUser(this.user);
      swal.fire({
        type: 'success',
        title: 'Datos guardados correctamente'
      });
      this.changeToEdit();
      this.disabled = false;
    }
    
  }

  saveUser(user: User) {
    this.userService.editUser(user)
      .then(() => {
        console.log('datos guardados correctamente')
      }, error => console.log(error));
  }

}
