import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { User, UserVerified } from '../../interfaces/user';

import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;
  uid: string;
  emailVerified: string;
  message: string;

  edit = false;
  userImage: any;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private firebaseStorage: AngularFireStorage) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.getUserParams()
      .subscribe( params => {
        this.uid = params.uid;
        this.emailVerified = params.emailVerified;
        console.log(params);
        this.userService.getUserById(this.uid)
          .subscribe( (response: User) => {
            console.log(response);
            this.user = response;
            if (this.emailVerified !== this.user.emailVerified) {
              const userVerified: UserVerified = {
                uid: this.user.uid,
                emailVerified: this.emailVerified
              };
              this.userService.editUser(userVerified);
            }
            if (this.user.emailVerified !== 'true') {
              this.message = 'Por favor verifique su correo electrónico o inicie sesión nuevamente';
            }
          }, error => console.log(error)
          );
      });
  }

  getUserParams() {
    return this.activatedRoute.queryParams;
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
