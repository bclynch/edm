import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticateUserAccountGQL, RegisterUserAccountGQL, CurrentAccountGQL, CreateFollowListGQL, RemoveFollowlistGQL } from '../generated/graphql';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailService } from './email.service';

@Injectable()
export class UserService {
  public signedIn: Observable<boolean>;
  private signedInSubject: BehaviorSubject<boolean>;
  user = null;

  constructor(
    private apollo: Apollo,
    private cookieService: CookieService,
    private authenticateUserAccountGQL: AuthenticateUserAccountGQL,
    private registerUserAccountGQL: RegisterUserAccountGQL,
    private currentAccountGQL: CurrentAccountGQL,
    private createFollowListGQL: CreateFollowListGQL,
    private removeFollowlistGQL: RemoveFollowlistGQL,
    private snackBar: MatSnackBar,
    private emailService: EmailService
  ) {
    this.signedInSubject = new BehaviorSubject<boolean>(false);
    this.signedIn = this.signedInSubject;
  }

  fetchUser(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.cookieService.get('edm-token')) {
        // uses token to check if logged in / expired
        this.currentAccountGQL.fetch().subscribe(
          (result) => {
            console.log(result.data);
            if (result.data.currentAccount) {
              this.user = result.data.currentAccount;
              this.signedInSubject.next(true);
            } else {
              // if it doesnt exist dump the token
              this.cookieService.delete('edm-token');
            }
            resolve();
          }
        );
      } else {
        resolve();
      }
    });
  }

  loginUser(model) {
    return new Promise<string>((resolve, reject) => {
      this.authUserAccount({ email: model.email, password: model.password }).then((token) => {
        // need to get current user function rolling for other pertinent info
        const userObj: any = {};
        userObj.token = token;

        // save user to local storage
        this.cookieService.set('edm-token', token);

        resolve();
      }, (err) => {
        alert('The email or password is incorrect. Please check your account information and login again');
        reject();
      });
    });
  }

  logoutUser() {
    this.signedInSubject.next(false);
    // reset apollo cache and refetch queries
    this.apollo.getClient().resetStore();
    this.cookieService.delete('edm-token');
    // reload window to update db role
    window.location.reload();
  }

  private authUserAccount(loginCredentials): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.authenticateUserAccountGQL.mutate({ email: loginCredentials.email, password: loginCredentials.password }).subscribe(({ data }) => {
        // console.log('got data', data);
        const authData = <any>data;
        if (authData.authenticateUserAccount.jwtToken) {
          this.signedInSubject.next(true);
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
    return new Promise<string>((resolve, reject) => {
      this.registerUserAccountGQL.mutate({ username: model.username, email: model.email, password: model.matchingPassword.password }).subscribe(
        ({ data }) => {
          const userObj = data as any;

          // send welcome registration email
          console.log(model.email);
          this.emailService.sendRegistrationEmail(model.email).subscribe(
            (result) => {}
          );

          // auth to snag token
          this.authUserAccount({ email: model.email, password: model.matchingPassword.password }).then((token) => {
            userObj.token = token;
            // save user token to local storage
            this.cookieService.set('edm-token', token);

            resolve();
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
          reject();
        }
      );
    });
  }

  follow(artistId: string, venueId: string, name: string) {
    return new Promise((resolve, reject) => {
      if (this.user) {
        this.createFollowListGQL.mutate({ accountId: this.user.id, artistId, venueId }).subscribe(
          ({ data }) => {
            this.snackBar.open(`You are now following ${name}`, 'Close', {
              duration: 3000,
            });
            resolve(data.createFollowList.followList.id);
          }
        );
      } else {
        this.snackBar.open('Login to your account to add to watch list', 'Close', {
          duration: 3000,
        });
        resolve(null);
      }
    });
  }

  unfollow(followListId: number) {
    return new Promise((resolve, reject) => {
      this.removeFollowlistGQL.mutate({ followListId }).subscribe(
        () => resolve()
      );
    });
  }
}
