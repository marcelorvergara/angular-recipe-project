import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToke: string;
  expiresIn: string;
  localId: string;
  registred?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          environment.apiKey,
        { email, password, returnSecureToken: true }
      )
      .pipe(catchError(this.handleError));
  }

  logIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.apiKey,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResp: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!...';
    if (!errorResp.error || !errorResp.error.error) {
      return throwError(() => errorMessage);
    }
    switch (errorResp.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email was not found or password is incorrect!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This email was not found or password is incorrect!';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'This email was not found or password is incorrect!';
        break;
    }
    return throwError(() => errorMessage);
  }
}
