import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  initializeAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  BehaviorSubject,
  catchError,
  from,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { app } from '../../../env/environment.firebase';
import { User } from '../Common/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject<User>(new User());
  private readonly auth = initializeAuth(app, {
    persistence: browserSessionPersistence,
    popupRedirectResolver: undefined,
  });

  constructor(private readonly router: Router) {}

  login(email: string, pass: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, pass)).pipe(
      catchError((error) => {
        let errorMessage = 'An unknown error occurred.';
        if (error.code) {
          switch (error.code) {
            case 'auth/invalid-credential':
              errorMessage = 'Invalid login credentials. Please try again.';
              break;
            case 'auth/missing-password':
              errorMessage = 'Please create a Password.';
              break;
          }
        }
        return throwError(() => new Error(errorMessage));
      }),
      tap((res: any) => {
        const expiresInTs =
          new Date().getTime() + +res._tokenResponse.expiresIn * 1000;
        const expiresIn = new Date(expiresInTs);
        console.log(res);
        const user = new User(
          res._tokenResponse.email,
          res._tokenResponse.localId,
          res._tokenResponse.idToken,
          expiresIn
        );
        this.emitUser(user);
        console.log('navigate to template');
        this.router.navigate(['/template']);
      })
    );
  }

  signup(email: string, pass: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, pass)).pipe(
      catchError((error) => {
        let errorMessage = 'An unknown error occurred.';
        if (error.code) {
          switch (error.code) {
            case 'auth/weak-password':
              errorMessage = 'Password should be at least 6 characters.';
              break;
            case 'auth/missing-password':
              errorMessage = 'Please create a Password.';
              break;
            case 'auth/email-already-in-use':
              errorMessage =
                'The email address is already in use by another account.';
              break;
          }
        }
        return throwError(() => new Error(errorMessage));
      }),
      tap((res: any) => {
        const expiresInTs =
          new Date().getTime() + +res._tokenResponse.expiresIn * 1000;
        const expiresIn = new Date(expiresInTs);
        console.log(res);
        const user = new User(
          res._tokenResponse.email,
          res._tokenResponse.localId,
          res._tokenResponse.idToken,
          expiresIn
        );
        this.emitUser(user);
        console.log('navigate to template');
        this.router.navigate(['/template']);
      })
    );
  }

  resetPassword(email: string, code: string = '', newPass: string = '') {
    const actionCodeSettings = {
      url: 'https://www.templify-pro.com/?email=user@gmail.com',
      iOS: {
        bundleId: 'com.templify-pro.ios',
      },
      android: {
        packageName: 'com.templify-pro.android',
        installApp: true,
        minimumVersion: '12',
      },
      handleCodeInApp: true,
    };
    sendPasswordResetEmail(this.auth, email, actionCodeSettings);

    // confirmPasswordReset(this.auth, code, newPass);
  }

  signout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('signed out successfully');
      })
      .catch((error) => {
        console.log('an error has occured - ' + error);
      });
  }

  emitUser(user: User) {
    this.user$.next(user);
  }
}
