import { Injectable } from '@angular/core';
import { AllLocationsGQL, CreatePushSubscriptionGQL } from '../generated/graphql';
import { BehaviorSubject, Observable} from 'rxjs';
import { AnalyticsService } from './analytics.service';
import { UserService } from './user.service';
import { Title, Meta } from '@angular/platform-browser';
import { SwPush } from '@angular/service-worker';
import { UtilService } from './util.service';

@Injectable()
export class AppService {
  public appInited: Observable<any>;
  private _subject: BehaviorSubject<any>;

  // used in location search component
  locations: string[];
  locationsObj = {};
  locationDirectory;

  readonly VAPID_PUBLIC_KEY = 'BCcrOxeXijgM9gmGD8_lfxo-mC2qKL3XKwFgYyTtETro2aTTZLXpbB4LLM0uihjLBD-3loEzDB3vBDt5Vko-eiU';

  constructor(
    private allLocationsGQL: AllLocationsGQL,
    private analyticsService: AnalyticsService,
    private userService: UserService,
    private titleService: Title,
    private meta: Meta,
    private swPush: SwPush,
    private createPushSubscriptionGQL: CreatePushSubscriptionGQL,
    private utilService: UtilService
  ) {
    this._subject = new BehaviorSubject<boolean>(false);
    this.appInited = this._subject;

    // init tracking
    this.analyticsService.trackViews();
  }

  appInit() {
    this.userService.fetchUser().then(
      () => {
        this.fetchAllLocations().then(
          () => this._subject.next(true)
        );
      }
    );
  }

  fetchAllLocations() {
    return new Promise((resolve, reject) => {
      this.allLocationsGQL.fetch().subscribe(
        ({ data }) => {
          // creating an array of strings with both cities + regions
          const locationsArr = [];
          this.locationDirectory = data.allRegions.nodes;
          for (const region of data.allRegions.nodes) {
            this.locationsObj[region.name] = region.name;
            locationsArr.push(region.name);

            for (const city of region.citiesByRegion.nodes) {
              if (locationsArr.indexOf(city.name) === -1) {
                locationsArr.push(city.name);
                this.locationsObj[city.name] = city.id;
              }
            }
          }
          this.locations = locationsArr;
          resolve();
        }
      );
    });
  }

  modPageMeta(title: string, description: string) {
    this.meta.removeTag('name="description"');
    this.titleService.setTitle(`${title} | EDM Flare`);
    this.meta.addTag({ name: 'description', content: `${description}. Discover upcoming edm shows where you live and get in touch with the local community.`});
  }

  subscribeToPushNotifications() {
    this.swPush.requestSubscription({ serverPublicKey: this.VAPID_PUBLIC_KEY })
      .then((sub) => {
        console.log(sub);
        // save sub to the db
        this.createPushSubscriptionGQL.mutate({
          accountId: this.userService.user.id,
          endpoint: sub.endpoint,
          p256Dh: this.utilService.arrayBufferToBase64(sub.getKey('p256dh')),
          auth: this.utilService.arrayBufferToBase64(sub.getKey('auth'))
        })
          .subscribe(
            (result) => {
              console.log(result);
            },
            err => console.log(err)
          );
      })
      .catch((err) => console.error('Could not subscribe to notifications', err)
    );
  }

  unsubscribeToPushNotifications() {
    this.swPush.requestSubscription({ serverPublicKey: this.VAPID_PUBLIC_KEY })
      .then((sub) => {
        sub.unsubscribe().then(
          () => {} // remove from db
        );
      })
      .catch((err) => console.error('Could not unsubscribe to notifications', err)
    );
  }
}
