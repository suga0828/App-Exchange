import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { Operation } from '../../interfaces/operation';
import { Plataform } from '../../interfaces/plataform';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { AngularFireStorage } from '@angular/fire/storage';

import swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  action: string
  operation: Operation;
  user: User;
  plataform: Plataform = {
    id: null,
    name: '',
    tax: null,
    type: null,
  };
  typeAccounts = {
    plataform: 'Monedero Electrónico',
    banking: 'Cuenta Bancaria'
  };

  newBalance: number;

  plataformForm: FormGroup;

  voucherImage: any;
  voucherImageName: string;
  voucherAdminImage: any;
  voucherAdminImageName: string
  disabled = false;

  exchangeRate: number;
  newExchangeRate: number;
  
  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private firebaseStorage: AngularFireStorage,
  ) { }

  ngOnInit() {
    this.action = this.data.action;
    this.user = this.data.user;
    this.operation = this.data.operation;
    this.plataform = this.data.plataform;
    if (this.action === 'addPlataform' || this.action === 'editPlataform') {
      this.buildPlataformForm();
    }
    if (this.action === 'editPlataform') {
        this.buildEditPlataformForm();
    }
    if (this.action === 'exchangeRate') {
      this.exchangeRate = this.data.exchangeRate;
    }
  }

  buildPlataformForm() {
    this.plataformForm = this.formBuilder.group({
      name: ['', Validators.required],
      tax: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.maxLength(3)
      ])],
      type: ['', Validators.required]
    });
  }

  buildEditPlataformForm() {
    this.plataformForm = this.formBuilder.group({
      name: [this.plataform.name, Validators.required],
      tax: [this.plataform.tax, Validators.compose([
        Validators.required,
        Validators.maxLength(3),
        Validators.pattern('[0-9]+'),
      ])],
      type: [this.plataform.type, Validators.required]
    });
  }

  get name() {
    return this.plataformForm.get('name');
  }

  get tax() {
    return this.plataformForm.get('tax');
  }

  get type() {
    return this.plataformForm.get('type');
  }

  verifyUser() {
    const verifiedUser: User = {
      ...this.user,
      isVerified: true
    }
    this.userService.editUser(verifiedUser)
      .then( data => {
        const message = `El usuario se ha verificado exitosamente`;
        this.close(data, message);
      })
      .catch( data => {
        const message = `Ocurrió un error, intente de nuevo`;
        this.close(data, message);
      });
  }

  assignBalanceUser() {
    const assignUser: User = {
      ...this.user,
      balance: this.newBalance
    }
    this.userService.editUser(assignUser)
      .then( data => {
        const message = `Se ha asignado ${this.newBalance} USD como saldo al usuario ${this.user.displayName} exitosamente`;
        this.close(data, message, 10000, 'x');
      })
      .catch( data => {
        const message = `Ocurrió un error, intente de nuevo`;
        this.close(data, message);
      });
  }

  cancelOperation() {
    const canceledOperation: Operation = {
      ...this.operation,
      status: 'Cancelada'
    }
    this.userService.editOperation(canceledOperation)
      .then( data => {
        const message = `La operación se canceló exitosamente`;
        this.close(data, message);
      })
      .catch( data => {
        const message = `Ocurrió un error, intente de nuevo`;
        this.close(data, message);
      });
  }

  addPlataform() {
    if (this.plataformForm.invalid) {
      this.markFormGroupTouched(this.plataformForm);
      return;
    }
    const plataform: Plataform = {
      ...this.plataformForm.value,
      id: Date.now(),
    };
    this.userService.registerPlataform(plataform)
      .then(data => {
        const message = `La plataforma se agregó exitosamente`;
        this.close(data, message);
      })
      .catch(data => {
        const message = `Ocurrió un error, intente de nuevo`;
        this.close(data, message);
      });
  }

  editPlataform() {
    if (this.plataformForm.invalid) {
      this.markFormGroupTouched(this.plataformForm);
      return;
    }
    const plataform: Plataform = {
      ...this.plataformForm.value,
      id: this.plataform.id
    };
    this.userService.editPlataform(plataform)
      .then(data => {
        const message = `La plataforma se editó exitosamente`;
        this.close(data, message);
      })
      .catch(data => {
        const message = `Ocurrió un error, intente de nuevo`;
        this.close(data, message);
      });
  }

  deletePlataform() {
    this.userService.deletePlataform(this.plataform.id)
      .then(data => {
        const message = `La plataforma se eliminó exitosamente`;
        this.close(data, message);
      })
      .catch(data => {
        const message = `Ocurrió un error, intente de nuevo`;
        this.close(data, message);
      });
  }

  updateExchangeRate() {
    this.userService.editExchangeRate(this.newExchangeRate)
      .then(data => {
        const message = `Se ha asignado ${this.newExchangeRate} COP/USD como nuevo tipo de cambio exitosamente`;
        this.close(data, message, 10000, 'x');
      })
      .catch(data => {
        const message = `Ocurrió un error, intente de nuevo`;
        this.close(data, message);
      });
  }

  saveVoucher() {
    this.disabled = true;
    const currentPictureId = Date.now();
    const pictures = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').putString(this.voucherImage, 'data_url');
    pictures.then(() => {
      this.voucherImage = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL();
      this.voucherImage.subscribe((path: string) => {
        this.userService.saveVoucherOperation(path, this.operation.uid, this.operation.date)
          .then(() => {
            const operationWithVoucher: Operation = {
              ...this.operation,
              status: 'En revisión'
            }
            this.userService.editOperation(operationWithVoucher)
              .then( data => {
                const message = `El comprobante de la operación se guardó exitosamente`;
                this.close(data, message);
              })
              .catch(error => {
                swal.fire({
                  type: 'error',
                  title: 'Ocurrió un error, intente de nuevo'
                });
                console.error(error)
              })
          }, error => console.error(error));
      });
    }, error => console.error(error));
  }

  saveVoucherAdmin() {
    this.disabled = true;
    const currentPictureId = Date.now();
    const pictures = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').putString(this.voucherAdminImage, 'data_url');
    pictures.then(() => {
      this.voucherAdminImage = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL();
      this.voucherAdminImage.subscribe((path: string) => {
        this.userService.saveVoucherAdminOperation(path, this.operation.uid, this.operation.date)
          .then(() => {
            const operationWithVoucher: Operation = {
              ...this.operation,
              status: 'Procesada'
            }
            this.userService.editOperation(operationWithVoucher)
              .then(data => {
                const message = `Operación completada exitosamente`;
                this.close(data, message);
              })
              .catch(error => {
                swal.fire({
                  type: 'error',
                  title: 'Ocurrió un error, intente de nuevo'
                });
                console.error(error)
              })
          }, error => console.error(error));
      });
    }, error => console.error(error));
  }

  changeImage(event: any) {
    const file = event.target.files[0];
    if (this.operation.voucherImage) {
      this.voucherAdminImageName = file.name;
    } else {
      this.voucherImageName = file.name;
    }
    if (file) {
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
    if (this.operation.voucherImage) {
      this.voucherAdminImage = 'data:image/png;base64,' + btoa(binaryString);
    } else {
      this.voucherImage = 'data:image/png;base64,' + btoa(binaryString);
    }
  }

  acceptOperation() {
    const acceptedOperation: Operation = {
      ...this.operation,
      status: 'En proceso'
    }
    this.userService.editOperation(acceptedOperation)
      .then( data => {
        const message = `La operación se aprobó exitosamente`;
        this.close(data, message);
      })
      .catch( data => {
        const message = `Ocurrió un error, intente de nuevo`;
        this.close(data, message);
      });
  }

  rejectOperation() {
    const rejectedOperation: Operation = {
      ...this.operation,
      status: 'Rechazada'
    }
    this.userService.editOperation(rejectedOperation)
      .then( data => {
        const message = `La operación se rechazó exitosamente`;
        this.close(data, message);
      })
      .catch( data => {
        const message = `Ocurrió un error, intente de nuevo`;
        this.close(data, message);
      });
  }

  closeOperation() {
    const closedOperation: Operation = {
      ...this.operation,
      status: 'Exitosa'
    }
    this.userService.editOperation(closedOperation)
      .then( data => {
        const message = `La operación se cerró exitosamente`;
        this.close(data, message);
      })
      .catch( data => {
        const message = `Ocurrió un error, intente de nuevo`;
        this.close(data, message);
      });
  }

  close(data: any, message: string, time?: number, action?: string) {
    this.dialogRef.close({
      message: message,
      data: data,
      time: time,
      action: action
    });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

}
