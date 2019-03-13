import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { UpdateAccountGQL, Frequency } from 'src/app/generated/graphql';
import { UserService } from 'src/app/services/user.service';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-email-preferences',
  templateUrl: './email-preferences.component.html',
  styleUrls: ['./email-preferences.component.scss']
})
export class EmailPreferencesComponent implements OnInit {

  frequency: Frequency;
  frequencies = [
    { label: 'Every day', value: 'EVERY_DAY' },
    { label: 'Three times a week', value: 'THREE_TIMES_A_WEEK' },
    { label: 'Two times a week', value: 'TWO_TIMES_A_WEEK' },
    { label: 'Once a week', value: 'ONCE_A_WEEK' },
    { label: 'Once every two weeks', value: 'ONCE_EVERY_TWO_WEEKS' },
    { label: 'Never', value: 'NEVER' }
  ];
  initSubscription: SubscriptionLike;

  constructor(
    private appService: AppService,
    private updateAccountGQL: UpdateAccountGQL,
    private userService: UserService
  ) {
    this.appService.modPageMeta('Email Preference Settings', 'Modify email settings for your EDM Flare account');

    this.initSubscription = this.appService.appInited.subscribe(
      (inited) =>  {
        if (inited) {
          this.frequency = this.userService.user.notificationFrequency;
        }
      }
    );
  }

  ngOnInit() {
  }

  changeFrequency() {
    console.log(this.frequency);
    this.updateAccountGQL.mutate({ userId: this.userService.user.id, profilePhoto: this.userService.user.profilePhoto, notificationFrequency: this.frequency })
    .subscribe(
      (result) => {
        console.log(result);
      },
      err => {
        console.log(err);
      }
    );
  }
}
