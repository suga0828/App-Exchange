import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { Operation } from '../../interfaces/operation';
import { Plataform } from '../../interfaces/plataform';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  action: string
  date: number;
  operation: Operation;
  uid: string;

  user: User;
  plataform: Plataform = {
    id: null,
    name: '',
    tax: null,
  };

  plataformForm: FormGroup;
  
  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    console.log(this.data);
    this.date = this.data.date;
    this.action = this.data.action;
    this.uid = this.data.uid;
    if (this.uid) {
      this.userService.getUserById(this.uid)
      .subscribe( (user: User) => {
        this.user = user;
      }, error => console.log(error) );
    }
    if (this.date) {
      this.userService.getOperation(this.uid, this.date)
        .subscribe( (operation: Operation) => {
          this.operation = operation;
        }, error => console.log(error));
    }
    if (this.action === 'addPlataform' || this.action === 'editPlataform') {
      this.buildPlataformForm();
    }
    if (this.action === 'editPlataform') {
      const plataformId = this.data.plataform.id;
      this.userService.getPlataform(plataformId)
        .subscribe( (plataform: Plataform) => {
          this.plataform = plataform;
          this.buildEditPlataformForm();
        }, error => console.log(error));
    }
    if (this.action === 'deletePlataform') {
      this.plataform = this.data.plataform;
    }
  }

  buildPlataformForm() {
    this.plataformForm = this.formBuilder.group({
      name: ['', Validators.required],
      tax: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.maxLength(3)
      ])]
    });
  }

  buildEditPlataformForm() {
    this.plataformForm = this.formBuilder.group({
      name: [this.plataform.name, Validators.required],
      tax: [this.plataform.tax, Validators.compose([
        Validators.required,
        Validators.maxLength(3),
        Validators.pattern('[0-9]+'),
      ])]
    });
  }

  get name() {
    return this.plataformForm.get('name');
  }

  get tax() {
    return this.plataformForm.get('tax');
  }

  verifyUser() {
    const verifiedUser: User = {
      ...this.user,
      isVerified: true
    }
    this.userService.editUser(verifiedUser)
      .then( data => {
        const message = `La usuario se ha verificado exitosamente`;
        this.close(data, message);
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
    console.log(canceledOperation)
    this.userService.editOperation(canceledOperation, this.uid)
      .then( data => {
        const message = `La operación se canceló exitosamente`;
        this.close(data, message);
      })
      .catch( data => {
        const message = `Ocurrió un error, intente de nuevo`;
        this.close(data, message);
      });
  }

  detailedOperation(id: string, date: number) {
    this.userService.getOperation(id, date)
      .subscribe( () => {

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
    console.log(plataform);
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

  close(data: any, message: string) {
    this.dialogRef.close({
      message: message,
      data: data
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
