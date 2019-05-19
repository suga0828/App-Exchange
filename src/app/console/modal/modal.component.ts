import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  date: number;
  operation: string;
  uid: string;

  user: User;
  
  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService) { }

  ngOnInit() {
    if (this.data.uid) {
      this.uid = this.data.uid;
      this.userService.getUserById(this.uid)
      .subscribe( (user: User) => {
        this.user = user;
      }, error => console.log(error) );
    }
    this.date = this.data.date;
    this.operation = this.data.operation;
  }

  verifyUser() {
    const verifiedUser = {
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
    this.userService.deleteOperation(this.date, this.uid)
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
