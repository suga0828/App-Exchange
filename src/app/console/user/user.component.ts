import { Component, OnInit, OnChanges, Input, EventEmitter, Output, OnDestroy } from '@angular/core';

import { GetCountriesService } from '../../services/get-countries.service';
import { UserService } from '../../services/user.service';

import { Country } from '../../interfaces/country';
import { Account } from '../../interfaces/account';
import { Plataform } from '../../interfaces/plataform';
import { User } from '../../interfaces/user';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ModalComponent } from '../modal/modal.component';

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
export class UserComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public currentUser: User;
  accountsSubscription: Subscription;

  @Output() view = new EventEmitter<String>();

  private user: User;
  messages: String;
  account: Account;
  accounts: Account[];
  addAccount = false;
  editAccount = false;

  typeAccount: any;
  register = false;
  edit = false;
  aHundredYearsAgo: Date;
  now: Date;
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
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() { }

  ngOnChanges() {
    this.getAccounts();
    if (this.currentUser) {
      if (Object.keys(this.currentUser).length < 10) {
        swal.fire({
          type: 'warning',
          title: 'Por favor agregue todos los campos solicitados',
          timer: 1500
        });
      }
    }
  }

  getAccounts() {
    if (this.currentUser) {
      this.accountsSubscription = this.userService.getUserAccounts(this.currentUser.uid)
        .subscribe((accounts: Account[]) => {
          this.accounts = accounts;
        }, error => console.error(error));
    }
  }

  buildRegisterForm() {
    this.userService.getPlataforms()
      .subscribe( (plataforms: Plataform[]) => {
        this.plataforms = plataforms;
      }, error => console.error(error) );
    this.registerAccountForm = this.formBuilder.group({
      type: ['', Validators.required],
      plataform: ['', Validators.required],
      name: ['', Validators.required],
      entity: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numberAccount: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+')
      ])],
      accountType: ['', Validators.required]
    });
  }

  buildEditAccountForm(account: Account) {
    if (account.email) {
      const cleanEmail = account.email.replace(',', '.') //Firebase don't accept dot in string.
      account.email = cleanEmail;
    }
    this.plataform.setValue(account.plataform)
    this.entity.setValue(account.entity)
    this.registerAccountForm = this.formBuilder.group({
      date: [account.date],
      type: [account.type, Validators.required],
      plataform: ['', Validators.required],
      name: [account.name, Validators.required],
      entity: ['', Validators.required],
      email: [account.email, [Validators.required, Validators.email]],
      numberAccount: [account.numberAccount, Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+')
      ])],
      accountType: [account.accountType, Validators.required]
    });
    if (account.plataform) {
      const accountPlataform = this.plataforms.find(pl => {
        return pl.name == account.plataform.name;
      });
      this.plataform.setValue(accountPlataform)
    }
    if (account.entity) {
      const accountEntity = this.plataforms.find(pl => {
        return pl.name == account.entity.name;
      });
      this.entity.setValue(accountEntity)
    }
  }

  buildEditForm() {
    this.countriesService.getCountries()
      .subscribe( countries => {
        this.countries = countries;
      }, error => console.error(error) );
    this.now = new Date(Date.now());
    const oneHundredYearsInMiliseconds = Date.now() - 100 * 365 * 24 * 60 * 60 * 1000;
    this.aHundredYearsAgo = new Date(oneHundredYearsInMiliseconds);
    this.editAccountForm = this.formBuilder.group({
      userEmail: [this.currentUser.email, Validators.compose([
        Validators.required,
        Validators.email
      ])],
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
      documentImage: [''],
    });
  }

  changeToEdit() {
    this.edit = !this.edit;
    if (this.edit) {
      this.buildEditForm()
    }
  }

  //- Edit form vars
  get userEmail() {
    return this.editAccountForm.get('userEmail');
  }

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
      email: this.userEmail.value,
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
        title: 'Datos guardados correctamente',
        timer: 1500
      });
      this.changeToEdit();
      this.disabled = false;
    }
  }

  changeToRegister() {
    this.register = !this.register;
    if (this.register) {
      this.buildRegisterForm();
    }
  }
  
  //- Register form vars
  get date() {
    return this.registerAccountForm.get('date');
  }
  
  get type() {
    return this.registerAccountForm.get('type');
  }

  get name() {
    return this.registerAccountForm.get('name');
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
          }, error => console.error(error) );
      });
    }, error => console.error(error) );
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
      }, error => console.error(error));
  }

  showAddAccount() {
    this.addAccount = true;
    this.buildRegisterForm();
  }

  registerAccount() {
    const date = Date.now();
    if (this.type.value === this.typeAccounts.plataform) {
      this.account = {
        currency: this.plataform.value.currency,
        id: `${this.plataform.value.name}: ${this.email.value}`,
        name: this.name.value,
        email: this.email.value,
        date: date,
        plataform: this.plataform.value,
        type: this.type.value
      }
      const controls = Object.values(this.account);
      for ( let i = 0; i < controls.length; i++) {
        if ( controls[i] === '') {
          swal.fire({
            type: 'warning',
            title: 'Complete los campos solicitados'
          });
          return
        }
      }
      if (this.email.hasError('email') ) {
        return
      }
    } else if (this.type.value === this.typeAccounts.banking) {
      this.account = {
        currency: this.entity.value.currency,
        name: this.name.value,
        accountType: this.accountType.value,
        entity: this.entity.value,
        date: date,
        id: `${this.entity.value.name}: ${this.numberAccount.value}`,
        numberAccount: this.numberAccount.value,
        type: this.type.value
      }
      const controls = Object.values(this.account);
      for ( let i = 0; i < controls.length; i++) {
        if ( controls[i] === '') {
          swal.fire({
            type: 'warning',
            title: 'Complete los campos solicitados'
          });
          return
        }
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
        console.error(error)
        swal.fire({
          type: 'error',
          title: 'Ocurrió un error registrando su cuenta'
        });
      });
      this.addAccount = false;
  }

  showEditAccount(account: Account) {
    this.editAccount = true;
    this.buildEditAccountForm(account);
  }

  updateAccount() {
    if (this.type.value === this.typeAccounts.plataform) {
      this.account = {
        date: this.date.value,
        currency: this.plataform.value.currency,
        id: `${this.plataform.value.name}: ${this.email.value}`,
        name: this.name.value,
        email: this.email.value,
        plataform: this.plataform.value,
        type: this.type.value
      }
      const controls = Object.values(this.account);
      for (let i = 0; i < controls.length; i++) {
        if (controls[i] === '') {
          swal.fire({
            type: 'warning',
            title: 'Complete los campos solicitados'
          });
          return
        }
      }
      if (this.email.hasError('email')) {
        return
      }
    } else if (this.type.value === this.typeAccounts.banking) {
      this.account = {
        date: this.date.value,
        currency: this.entity.value.currency,
        name: this.name.value,
        accountType: this.accountType.value,
        entity: this.entity.value,
        id: `${this.entity.value.name}: ${this.numberAccount.value}`,
        numberAccount: this.numberAccount.value,
        type: this.type.value
      }
      const controls = Object.values(this.account);
      for (let i = 0; i < controls.length; i++) {
        if (controls[i] === '') {
          swal.fire({
            type: 'warning',
            title: 'Complete los campos solicitados'
          });
          return
        }
      }
    } else {
      swal.fire({
        type: 'warning',
        title: 'Seleccione un tipo de cuenta'
      });
      return;
    }
    this.userService.editAccount(this.account, this.currentUser.uid)
      .then(r => {
        swal.fire({
          type: 'success',
          title: 'Actualización de cuenta realizada',
          text: `Su cuenta  ${this.account.type} ha sido actualizada exitosamente.`,
        });
      })
      .catch(error => {
        console.error(error)
        swal.fire({
          type: 'error',
          title: 'Ocurrió un error actualizando su cuenta'
        });
      });
    this.editAccount = false;
  }

  openDialog(action: string, user?: User, operation?, plataform?, exchangeRate?, account?: Account) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '360px',
      data: {
        action: action,
        user: user,
        operation: operation,
        plataform: plataform,
        exchangeRate: exchangeRate,
        account: account
      }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.openSnackBar(result.message, result.action, result.time);
        }
      }, error => {
        console.error(error);
        this.openSnackBar('Ocurrió un error al realizar la operación', error);
      });
  }

  openSnackBar(message: string, action: string = '', time?: number) {
    this.snackBar.open(message, action, {
      duration: time || 2500,
    });
  }

  changeView(view: String) {
    this.view.emit(view);
  }

  ngOnDestroy() {
    this.accountsSubscription.unsubscribe();
  }

}
