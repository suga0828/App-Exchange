import { Component, OnInit, OnChanges, Input } from '@angular/core';

import { GetCountriesService } from '../../services/get-countries.service';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';

import { Country } from '../../interfaces/country';
import { Account } from '../../interfaces/account';
import { Plataform } from '../../interfaces/plataform';
import { User } from '../../interfaces/user';

import { AngularFireStorage } from '@angular/fire/storage';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Subscription } from 'rxjs';

// ES6 Modules or TypeScript
import swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnChanges {

  @Input() public currentUser: User;
  plataformSubscription: Subscription;

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
  plataforms: Plataform[];
  accountTypes = [
    'Cuenta de Ahorro', 'Cuenta Corriente'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private firebaseStorage: AngularFireStorage,
    private countriesService: GetCountriesService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
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
      }, error => console.log(error) );
  }

  ngOnChanges() {
    if (this.currentUser) {
      if ( Object.keys(this.currentUser).length < 8 ) {
        if (!this.showAlert) {
          swal.fire({
            type: 'warning',
            title: 'Por favor complete todos los campos solicitados',
          });
        }
      } else {
        this.showAlert = true;
      }
    }
  }

  buildRegisterForm() {
    this.userService.getPlataforms()
      .subscribe( (plataforms: Plataform[]) => {
        this.plataforms = plataforms;
      }, error => console.log(error) );
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
    this.countriesService.getCountries()
      .subscribe( countries => {
        this.countries = countries;
      }, error => console.log(error) );
    this.editAccountForm = this.formBuilder.group({
      birthDate: [this.currentUser.birthdate, Validators.required],
      country: [this.currentUser.country, Validators.required],
      phoneNumber: [this.currentUser.phoneNumber, Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+')
      ])],
      documentNumber: [this.currentUser.idDocument, Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z0-9 ]+'),
      ])],
      documentImage: ['', Validators.required],
    });
  }

  changeToEdit() {
    this.edit = !this.edit;
    if (this.edit) {
      this.buildEditForm()
    }
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
      ...this.currentUser,
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
    if (this.register) {
      this.buildRegisterForm();
      this.plataformSubscription = this.userService.getPlataforms()
        .subscribe( (plataforms: Plataform[]) => {
          this.plataforms = plataforms;
        });
    }
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
    this.userService.registerAccount(this.account, this.currentUser.uid)
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
