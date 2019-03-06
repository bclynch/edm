import { Injectable } from '@angular/core';
import { AllLocationsGQL } from '../generated/graphql';
import { BehaviorSubject, Observable} from 'rxjs';
import { AnalyticsService } from './analytics.service';
import { UserService } from './user.service';
import { Title, Meta } from '@angular/platform-browser';

@Injectable()
export class AppService {
  public appInited: Observable<any>;
  private _subject: BehaviorSubject<any>;

  // used in location search component
  locations: string[];
  locationsObj = {};

  constructor(
    private allLocationsGQL: AllLocationsGQL,
    private analyticsService: AnalyticsService,
    private userService: UserService,
    private titleService: Title,
    private meta: Meta
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
        (result) => {
          // creating an array of strings with both cities + regions
          const locationsArr = [];
          for (const x of result.data.allCities.nodes) {
            if (x.name) {
              if (locationsArr.indexOf(x.name) === -1) {
                locationsArr.push(x.name);
                this.locationsObj[x.name] = x.id;
              }
              if (locationsArr.indexOf(x.region) === -1 && x.region) {
                locationsArr.push(x.region);
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
}
