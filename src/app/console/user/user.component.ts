import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { User } from '../../interfaces/user';
import { GetCountriesService } from 'src/app/services/get-countries.service';
import { Country } from 'src/app/interfaces/country';

import { AngularFireStorage } from '@angular/fire/storage';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';

// ES6 Modules or TypeScript
import swal from 'sweetalert2';
import { Account } from 'src/app/interfaces/account';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  user: User;
  messages: String;
  account: Account;

  typeAccount: any;
  register = false;
  edit = false;
  disabled = false;
  updateImage = false;
  updateImageName: string;
  showAlert = false;
  userImage: any;
  countries: Country[];
  editAccountForm: FormGroup;
  registerAccountForm: FormGroup;
  typeAccounts = {
    plataform: 'Monedero Electrónico',
    banking: 'Cuenta Bancaria'
  };
  plataforms = [
    'Paypal', 'Skriller'
  ];
  accountTypes = [
    'Cuenta de Ahorro', 'Cuenta Corriente'
  ];
  userSubscription: Subscription;
  countrySubscription: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private firebaseStorage: AngularFireStorage,
    private countriesService: GetCountriesService) { }

  ngOnInit() {
    this.getUser();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.countrySubscription.unsubscribe();
  }

  buildRegisterForm() {
    this.registerAccountForm = this.formBuilder.group({
      type: ['', Validators.required],
      plataform: ['', Validators.required],
      entity: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numberAccount: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+')
      ])],
      accountType: ['', Validators.required]
    });
  }

  buildEditForm() {
    this.editAccountForm = this.formBuilder.group({
      birthDate: [this.user.birthdate, Validators.required],
      country: [this.user.country, Validators.required],
      phoneNumber: [this.user.phoneNumber, Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+')
      ])],
      documentNumber: [this.user.idDocument, Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z0-9 ]+'),
      ])],
      documentImage: ['', Validators.required],
    });
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
        this.userSubscription = this.userService.getUserById(currentUser.uid)
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
            this.countrySubscription = this.countriesService.getCountries()
              .subscribe( (countries: Country[]) => {
                this.countries = countries;
              });
          }, error => console.log(error)
          );
      });
  }

  changeToEdit() {
    this.edit = !this.edit;
    this.buildEditForm()
  }

  //- Edit form vars
  get birthDate() {
    return this.editAccountForm.get('birthDate');
  }

  get country() {
    return this.editAccountForm.get('country');
  }

  get phoneNumber() {
    return this.editAccountForm.get('phoneNumber');
  }

  get balance() {
    return this.editAccountForm.get('balance');
  }

  get documentNumber() {
    return this.editAccountForm.get('documentNumber');
  }

  get documentImage() {
    return this.editAccountForm.get('documentImage');
  }

  onEditSubmit() {
    this.disabled = true;
    this.user = {
      ...this.user,
      country: this.country.value,
      birthdate: this.birthDate.value,
      phoneNumber: this.phoneNumber.value,
      idDocument: this.documentNumber.value
    }
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

  changeToRegister() {
    this.register = !this.register;
    this.buildRegisterForm();
  }
  
  //- Register form vars
  get type() {
    return this.registerAccountForm.get('type');
  }

  get plataform() {
    return this.registerAccountForm.get('plataform');
  }

  get entity() {
    return this.registerAccountForm.get('entity');
  }

  get email() {
    return this.registerAccountForm.get('email');
  }

  get numberAccount() {
    return this.registerAccountForm.get('numberAccount');
  }

  get accountType() {
    return this.registerAccountForm.get('accountType');
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
    this.updateImageName = file.name;
    if(file) {
      if (file.size < 2096000) {
        const reader = new FileReader();
        reader.onload = this.handleReaderLoaded.bind(this);
        // reader.readAsArrayBuffer(file);
        // reader.readAsDataURL(this.updateImage);
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

  saveUser(user: User) {
    this.userService.editUser(user)
      .then(() => {
        console.log('datos guardados correctamente')
      }, error => console.log(error));
  }

  registerAccount() {
    console.log(this.typeAccount);
    const id = Date.now();
    if (this.typeAccount === this.typeAccounts.plataform) {
      this.account = {
        id: id,
        email: this.email.value,
        plataform: this.plataform.value,
        type: this.typeAccount
      }
    } else if (this.typeAccount === this.typeAccounts.banking) {
      this.account = {
        accountType: this.accountType.value,
        entity: this.entity.value,
        id: id,
        numberAccount: this.numberAccount.value,
        type: this.typeAccount
      }
    } else {
      swal.fire({
        type: 'warning',
        title: 'Seleccione un tipo de cuenta'
      });
      return;
    }
    this.userService.registerAccount(this.account, this.user.uid)
      .then(r => {
        swal.fire({
          type: 'success',
          title: 'Registro de cuenta realizada',
          text: `Su cuenta  ${this.account.type} ha sido registrada exitosamente.`,
        });
      })
      .catch(error => {
        console.log(error)
        swal.fire({
          type: 'error',
          title: 'Ocurrió un error registrando su cuenta'
        });
      });
    this.changeToRegister();
  }

}
