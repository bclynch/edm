import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { FormGroup, Validators, FormControl, FormBuilder, FormGroupDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { UpdatePasswordGQL, ResetPasswordGQL } from 'src/app/generated/graphql';
import { UserService } from 'src/app/services/user.service';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  changeForm: FormGroup = this.fb.group({
    currentPassword: [
      '',
      Validators.compose([
        Validators.required
      ])
    ],
    matchingPassword: this.fb.group({
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') // this is for the letters (both uppercase and lowercase) and numbers validation
        ])
      ],
      confirmPassword: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    })
  });

  formValidationMessages = {
    'currentPassword': [
      { type: 'required', message: 'Current Password is required' }
    ],
    'confirmPassword': [
      { type: 'areEqual', message: 'Password mismatch' },
      { type: 'required', message: 'Confirm password is required' },
    ],
    'password': [
      { type: 'required', message: 'New password is required' },
      { type: 'minlength', message: 'Password must be at least 8 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ]
  };

  resetForm: FormGroup = this.fb.group({
    email: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])
    ]
  });

  constructor(
    private appService: AppService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private updatePasswordGQL: UpdatePasswordGQL,
    private resetPasswordGQL: ResetPasswordGQL,
    private userService: UserService,
    private emailService: EmailService
  ) {
    this.appService.modPageMeta('Password Settings', 'Modify password settings for your EDM Flare account');
  }

  ngOnInit() {
  }

  changePassword(formDirective: FormGroupDirective) {
    this.updatePasswordGQL.mutate({ userId: this.userService.user.id, password: this.changeForm.value.currentPassword, newPassword: this.changeForm.value.matchingPassword.password })
      .subscribe(
        (result) => {
          if (result.data.updatePassword.boolean) {
            this.snackBar.open('Password changed', 'Close', {
              duration: 3000,
            });
            this.changeForm.reset();
            formDirective.resetForm();
          } else {
            this.snackBar.open('Something went wrong. Make sure you have the correct current password', 'Close', {
              duration: 3000,
            });
          }
        }
      );
  }

  sendReset(formDirective: FormGroupDirective) {
    console.log(this.resetForm.value);
    this.resetPasswordGQL.mutate({ email: this.resetForm.value.email })
      .subscribe(
        (result) => {
          this.emailService.sendResetEmail(this.resetForm.value, result.data.resetPassword.string).subscribe(
            data => {
              console.log(data);
              if (data.result === 'Forgot email sent') {
                this.resetForm.reset();
                formDirective.resetForm();
                this.snackBar.open('Your password reset email has been sent. Please check your inbox for the new password. It might take a minute or two to send.', 'Close', {
                  duration: 3000,
                });
              }
            }
          );
        },
        err => {
          switch (err.message) {
            case 'GraphQL error: permission denied for function reset_password':
              this.snackBar.open('Cannot reset password while user is logged in', 'Close', {
                duration: 3000,
              });
              break;
            case 'GraphQL error: column "user does not exist" does not exist':
              this.snackBar.open('That email doesn\'t exist. Check what you entered and try again', 'Close', {
                duration: 3000,
              });
              break;
            default:
              this.snackBar.open('Something went wrong. Check your email address and try again', 'Close', {
                duration: 3000,
              });
          }
        }
      );
  }
}

class PasswordValidator {
  // Inspired on: http://plnkr.co/edit/Zcbg2T3tOxYmhxs7vaAm?p=preview
  static areEqual(formGroup: FormGroup) {
    let value;
    let valid = true;
    for (const key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        const control: FormControl = <FormControl>formGroup.controls[key];

        if (value === undefined) {
          value = control.value;
        } else {
          if (value !== control.value) {
            valid = false;
            break;
          }
        }
      }
    }

    if (valid) {
      return null;
    }

    return {
      areEqual: true
    };
  }
}
