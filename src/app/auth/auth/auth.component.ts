import { Component, ComponentFactoryResolver } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../../shared/alert/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

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

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.logIn(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe({
      next: (responseData) => {
        console.log('Next', responseData);
      },
      error: (errorMessage) => {
        console.error('Error', errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      },
      complete: () => {
        console.info('complete...');
        this.isLoading = false;
        this.error = null;
        this.router.navigate(['/recipes']);
      },
    });

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    const alertCompFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
  }
}
