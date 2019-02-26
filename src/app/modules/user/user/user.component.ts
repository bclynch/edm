import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { AccountByUsernameGQL } from 'src/app/generated/graphql';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  initSubscription: SubscriptionLike;
  user;

  constructor(
    private appService: AppService,
    private accountByUsernameGQL: AccountByUsernameGQL,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    this.initSubscription = this.appService.appInited.subscribe(
      (inited) =>  {
        if (inited) {
          this.accountByUsernameGQL.fetch({
            username: this.activatedRoute.snapshot.paramMap.get('username'),
            accountId: this.userService.user ? this.userService.user.id : 0,
          }).subscribe(
            ({ data }) => {
              this.user = data.accountByUsername;
              console.log(this.user);
            }
          );
        }
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.initSubscription.unsubscribe();
  }
}
