import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      this.authService.logIn(email, password).subscribe({
        next: (responseData) => {
          console.log(responseData);
        },
        error: (errorMessage) => {
          console.error(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        },
        complete: () => {
          console.info('complete');
          this.isLoading = false;
        },
      });
    } else {
      this.authService.signUp(email, password).subscribe({
        next: (responseData) => {
          console.log(responseData);
        },
        error: (errorMessage) => {
          console.error(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        },
        complete: () => {
          console.info('complete');
          this.isLoading = false;
        },
      });
    }

    form.reset();
  }
}
