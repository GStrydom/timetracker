import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../shared/ui/ui.service';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router, private auth: AngularFireAuth, public snackBar: MatSnackBar, private uiService: UIService) {}

  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.uiService.loadingStateChanged.next(false);
        console.log(result);
        this.authChange.next(true);
        this.router.navigate(['/home']).then();
      }).catch(error => {
        this.uiService.loadingStateChanged.next(false);
        console.log(error.message);
        this.snackBar.open(error.message, null, {duration: 3000});
    });
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.uiService.loadingStateChanged.next(false);
        console.log(result);
        this.snackBar.open('Login success! Welcome back :)', null, {duration: 3000});
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/home']).then();
    }).catch(error => {
      this.uiService.loadingStateChanged.next(false);
      console.log(error.message);
      this.snackBar.open(error.message, null, {duration: 3000});
    });
  }

  logout() {
    this.auth.signOut().then();
    this.snackBar.open('You have been logged out. See you later!', null, {duration: 3000});
    this.isAuthenticated = false;
    this.authChange.next(false);
    this.router.navigate(['/login']).then();
  }

  getUser() {

  }

  isAuth() {
    return this.isAuthenticated;
  }
}
