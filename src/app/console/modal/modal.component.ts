import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService) { }

  ngOnInit() {
    
  }

  cancelOperation() {
    // this.userService.deleteOperation(a, 1)
  }

  close(data: any, message: string) {
    this.dialogRef.close({
      message: message,
      data: data
    });
  }

}
