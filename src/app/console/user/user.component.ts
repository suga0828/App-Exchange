import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { User } from '../../interfaces/user';

import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;
  message: string;

  edit = false;
  userImage: any;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService,
    private firebaseStorage: AngularFireStorage) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const currentUser = this.authenticationService.user;
    this.userService.getUserById(currentUser.uid)
        .subscribe( (user: User) => {
          this.user = user;
          if (this.user.emailVerified !== currentUser.emailVerified) {
            this.user.emailVerified = currentUser.emailVerified;
            this.userService.editUser(user);
            }
          if (this.user.emailVerified !== true) {
            this.message = 'Por favor verifique su correo electrónico o inicie sesión nuevamente';
          }
        }, error => console.log(error)
        );
  }

    logOut() {
    this.authenticationService.logOut();
    console.log('Sesión cerrada.');
    this.router.navigate(['console/login']);
  }

  changeToEdit() {
    if (this.edit) {
      this.edit = false;
    } else {
      this.edit = true;
    }
  }

  saveImage() {
    const currentPictureId = Date.now();
    const pictures = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').putString(this.userImage, 'data_url');
    pictures.then( () => {
      this.userImage = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL();
      this.userImage.subscribe( (path: string) => {
        this.userService.setIdImage(path, this.user.uid)
          .then( () => {
            alert('imagen guardada correctamente');
            this.changeToEdit();
          }, error => console.log(error) );
      });
    }, error => console.log(error) );
  }

  changeImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.userImage = 'data:image/png;base64,' + btoa(binaryString);
  }

  save() {
    if (this.userImage) {
      this.saveUser(this.user);
      this.saveImage();
    } else {
      this.saveUser(this.user);

      this.changeToEdit();
    }
  }

  saveUser(user: User) {
    this.userService.editUser(user)
      .then(() => {
        console.log('guardado!');
      }, error => console.log(error));
  }

}
