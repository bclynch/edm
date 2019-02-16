import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticateUserAccountGQL, RegisterUserAccountGQL, CurrentAccountGQL } from '../generated/graphql';
import { SigninDialogueComponent } from '../shared/signin-dialogue/signin-dialogue.component';
import { MatDialog } from '@angular/material';

@Injectable()
export class UserService {
  signedIn = false;
  user = null;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private cookieService: CookieService,
    private authenticateUserAccountGQL: AuthenticateUserAccountGQL,
    private registerUserAccountGQL: RegisterUserAccountGQL,
    private currentAccountGQL: CurrentAccountGQL,
    public dialog: MatDialog,
  ) { }

  fetchUser(): Promise<string> {
    return new Promise((resolve, reject) => {
      // uses token to check if logged in / expired
      this.currentAccountGQL.fetch().subscribe(
        (result) => {
          console.log(result.data);
          if (result.data.currentAccount) {
            this.user = result.data.currentAccount;
          } else {
            // if it doesnt exist dump the token
            // this.cookieService.delete('edm-token');
          }
          resolve();
        }
      );
    });
  }

  signin(type: 'login' | 'signup', path?: string): void {
    const dialogRef = this.dialog.open(SigninDialogueComponent, {
      data: { isLogin: type === 'login' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.type === 'signup') this.registerUserAccount(result.data);
        if (result.type === 'login') this.loginUser({ email: result.data.email, password: result.data.password });
      }
    });
  }

  private loginUser(model) {
    this.authUserAccount({ email: model.email, password: model.password }).then((token) => {
      // need to get current user function rolling for other pertinent info
      const userObj: any = {};
      userObj.token = token;

      // save user to local storage
      this.cookieService.set('edm-token', token);

      // reload window to update db role
      window.location.reload();
    }, (err) => {
      alert('The email or password is incorrect. Please check your account information and login again');
    });
  }

  logoutUser() {
    this.signedIn = false;
    // reset apollo cache and refetch queries
    this.apollo.getClient().resetStore();
    this.cookieService.delete('edm-token');
    // this.router.navigateByUrl('/');
    // reload window to update db role
    window.location.reload();
  }

  private authUserAccount(loginCredentials): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.authenticateUserAccountGQL.mutate({ email: loginCredentials.email, password: loginCredentials.password }).subscribe(({ data }) => {
        // console.log('got data', data);
        const authData = <any>data;
        if (authData.authenticateUserAccount.jwtToken) {
          this.signedIn = true;
          // reset apollo cache and refetch queries
          this.apollo.getClient().resetStore();
          resolve(authData.authenticateUserAccount.jwtToken);
        } else {
          // incorrect login warning
          reject('invalid login');
        }
      }, (error) => {
        console.log('there was an error sending the query', error);
        reject(error);
      });
    });
  }

  registerUserAccount(model) {
    this.registerUserAccountGQL.mutate({ username: model.username, email: model.email, password: model.password }).subscribe(({ data }) => {
      const userObj = data as any;

      // // send welcome registration email
      // this.apiService.sendRegistrationEmail(model.email).subscribe(
      //   result => {}
      // );

      // auth to snag token
      this.authUserAccount({ email: model.email, password: model.password }).then((token) => {
        userObj.token = token;
        // save user token to local storage
        this.cookieService.set('edm-token', token);

        // reload window to update db role
        window.location.reload();
      }, () => {
        console.log('err');
      });
    }, err => {
      switch (err.message) {
        case 'GraphQL error: duplicate key value violates unique constraint "account_username_key"':
          alert('That username already exists, please select a new one!');
          break;
        case 'GraphQL error: duplicate key value violates unique constraint "user_account_email_key"':
          alert('The selected email already exists. Try resetting your password or use a new email address.');
          break;
        case 'GraphQL error: permission denied for function register_account':
          alert('Looks like you\'re still logged into another account. Make sure you\'re logged out or reload the page and try again');
          break;
        default:
          alert('There is an issue submitting your registration. Please reload and try again');
      }
    });
  }
}
