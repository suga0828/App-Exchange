import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { Operation } from '../../interfaces/operation';

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
  
  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService) { }

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

  editPlataform() { }

  close(data: any, message: string) {
    this.dialogRef.close({
      message: message,
      data: data
    });
  }

}
