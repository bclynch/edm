import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { UpdateAccountGQL, Frequency, WatchedLocationByAccountGQL, DeleteWatchedByIdGQL, CreateWatchedToAccountGQL } from 'src/app/generated/graphql';
import { UserService } from 'src/app/services/user.service';
import { SubscriptionLike } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-email-preferences',
  templateUrl: './email-preferences.component.html',
  styleUrls: ['./email-preferences.component.scss']
})
export class EmailPreferencesComponent implements OnInit {

  locationValue: string;
  locations: { id: number, label: string, locationId: number | string }[] = [];

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
    private userService: UserService,
    private watchedLocationByAccountGQL: WatchedLocationByAccountGQL,
    private snackBar: MatSnackBar,
    private deleteWatchedByIdGQL: DeleteWatchedByIdGQL,
    private createWatchedToAccountGQL: CreateWatchedToAccountGQL
  ) {
    this.appService.modPageMeta('Email Preference Settings', 'Modify email settings for your EDM Flare account');

    this.initSubscription = this.appService.appInited.subscribe(
      (inited) =>  {
        if (inited) {
          this.frequency = this.userService.user.notificationFrequency;

          this.watchedLocationByAccountGQL.fetch({
            accountId: this.userService.user.id
          }).subscribe(
            ({ data }) => {
              console.log(data.allWatchedToAccounts.nodes);
              // this.locations = data.allWatchedToAccounts.nodes;
              this.locations = data.allWatchedToAccounts.nodes.map((location) => {
                if (location.region) return { id: location.id, label: location.region, locationId: location.region };
                return { id: location.id, label: location.cityByCityId.name, locationId: location.cityByCityId.id };
              });
            }
          );
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
        if (this.frequency !== 'NEVER' && !this.locations.length) {
          this.snackBar.open('Select at least one location to get email updates!', 'Close', {
            duration: 5000,
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  selectLocation(location: string) {
    const locationId = this.appService.locationsObj[location];

    // make sure its not a repeat. If so break fn
    for (const x of this.locations) {
      if (x.locationId === locationId) {
        this.locationValue = `reset-${Math.random()}`;
        return;
      }
    }

    if (this.locations.length === 5) {
      this.snackBar.open('You can only select up to five locations at a time to be notified for. Remove one to add more', 'Close', {
        duration: 5000,
      });
    } else {
      console.log(location);
      // save to account
      this.createWatchedToAccountGQL.mutate({
        accountId: this.userService.user.id,
        region: typeof locationId === 'string' ? locationId : null,
        cityId: typeof locationId === 'string' ? null : locationId
      })
        .subscribe(
          ({ data }) => {
            console.log(data.createWatchedToAccount.watchedToAccount);
            // add to local arr
            this.locations.push({ id: data.createWatchedToAccount.watchedToAccount.id, label: location, locationId });
            // onchange only fires if the binding changes so putting rand number
            this.locationValue = `reset-${Math.random()}`;
          },
          err => {
            console.log(err);
          }
        );
    }
  }

  removeLocation(e, id: number, index: number) {
    e.preventDefault();

    this.deleteWatchedByIdGQL.mutate({ id })
      .subscribe(
        () => this.locations.splice(index, 1),
        err => console.log(err)
      );
  }
}
