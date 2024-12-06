import { Component, OnInit, signal } from '@angular/core';
import { Constants } from '../../Common/Constants';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from '../../Template/button/button.component';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    ButtonComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  socialLogins: any;
  // emailFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email,
  // ]);

  signupForm!: FormGroup<any>;

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly snackBar: MatSnackBar
  ) {
    this.signupForm = this.formBuilder.group({
      emailFormControl: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      passFormControl: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getSocialLogins();
  }

  getSocialLogins() {
    this.socialLogins = Constants.SOCIAL_LOGINS;
  }

  navigate(navigateUrl: string) {
    this.router.navigate([navigateUrl]);
  }

  signupUser() {
    const email = this.signupForm.controls.emailFormControl.value;
    const pass = this.signupForm.controls.passFormControl.value;
    this.authService.signup(email, pass).subscribe(
      (data) => {
        console.log('Data: ' + data);
      },
      (errorMessage) => {
        console.log(errorMessage)
        this.snackBar.open(errorMessage, 'Close', {
          duration: 30000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    );
  }
}
