import { Injectable } from '@angular/core';
import { AllLocationsGQL } from '../generated/graphql';
import { BehaviorSubject, Observable} from 'rxjs';
import { AnalyticsService } from './analytics.service';

@Injectable()
export class AppService {
  public appInited: Observable<any>;
  private _subject: BehaviorSubject<any>;

  // used in location search component
  locations: string[];

  constructor(
    private allLocationsGQL: AllLocationsGQL,
    private analyticsService: AnalyticsService
  ) {
    this._subject = new BehaviorSubject<boolean>(false);
    this.appInited = this._subject;

    // init tracking
    this.analyticsService.trackViews();
  }

  appInit() {
    this.fetchAllLocations().then(
      () => this._subject.next(true)
    );
  }

  fetchAllLocations() {
    return new Promise((resolve, reject) => {
      this.allLocationsGQL.fetch().subscribe(
        (result) => {
          // creating an array of strings with both cities + regions
          const locationsArr = [];
          for (const x of result.data.allCities.nodes) {
            locationsArr.push(x.name);
            if (locationsArr.indexOf(x.region) === -1) {
              locationsArr.push(x.region);
            }
          }
          this.locations = locationsArr;
          resolve();
        }
      );
    });
  }
}
