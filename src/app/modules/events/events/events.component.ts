import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';
import { SearchEventsByCityGQL, SearchEventsByRegionGQL } from 'src/app/generated/graphql';
import { BehaviorSubject, SubscriptionLike } from 'rxjs';
import { MapsAPILoader } from '@agm/core';
import { UtilService } from 'src/app/services/util.service';
import { UserService } from 'src/app/services/user.service';
import { AppService } from 'src/app/services/app.service';
import { FormControl } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

class Event {
  id: string;
  name: string;
  startDate: number;
  ticketproviderurl: string;
  venue: string;
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent implements OnInit, OnDestroy {

  collapsed = true;

  // search props
  location: string;
  dateRange: string;
  recentFilter: string;
  searchQueryControl = new FormControl();

  events: Event[];
  eventsObservable = new BehaviorSubject<Event[]>([]);
  eventsInited = false;
  selectedLocation: string;
  initSubscription: SubscriptionLike;
  paramsSubscription: SubscriptionLike;

  // map props
  coords: { lat: number; lon: number; } = { lat: null, lon: null };
  zoomLevel: number;
  latlngBounds;
  geoJsonObject: any = null;
  mapStyle;
  boundedZoom: number;
  fullscreen = false;
  eventMarkers = [];
  clusterOptions = {
    gridSize: 10,
    minimumClusterSize: 2,
    averageCenter: true
  };
  mapInited = false;

  constructor(
    private routerService: RouterService,
    private searchEventsByCityGQL: SearchEventsByCityGQL,
    private searchEventsbyRegionGQL: SearchEventsByRegionGQL,
    // private mapsAPILoader: MapsAPILoader,
    private utilService: UtilService,
    private userService: UserService,
    private appService: AppService,
    private eventService: EventService,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {
    this.initSubscription = this.appService.appInited.subscribe(
      (inited) =>  {
        if (inited) {
          // if params change need to fire off a new search
          this.paramsSubscription = this.route.queryParams.subscribe((params) => {
            // grab location off cookie if not in url
            this.location = params.location ? params.location : this.cookieService.get('edm-location');
            this.dateRange = params.dates ? params.dates : params.new ? null : 'any';
            // if there is a date range in the query we didn't create it. Not using new filter then
            this.recentFilter = params.dates ? null : params.new ? params.new : null;
            if (this.recentFilter) {
              // notification to user these are recent shows
              this.snackBar.open('New Shows Added Since Last Time', 'Close');
            }
            this.searchQueryControl.setValue(params.query ? params.query : '');
            this.selectedLocation = this.location;
            this.appService.modPageMeta(`${this.selectedLocation} EDM Shows`, `Listing of upcoming edm events in ${this.selectedLocation}`);
            this.searchEvents();
          });
          if (this.location) {
            this.changeUrlPath();
          }
        }
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.initSubscription.unsubscribe();
    this.paramsSubscription.unsubscribe();
  }

  searchEvents() {
    const range = this.utilService.calculateDateRange(this.dateRange);
    const recentRange = this.utilService.calculateNewRange(this.recentFilter);
    // if location does not exist then make empty arr
    if (!this.appService.locationsObj[this.selectedLocation]) {
      this.eventsObservable.next([]);
      this.eventsInited = true;
    } else {
      // checking whether need to search cities or regions
      if (typeof this.appService.locationsObj[this.selectedLocation] === 'number') {
        this.searchEventsByCityGQL.fetch({
          query: this.searchQueryControl.value,
          cityId: this.appService.locationsObj[this.selectedLocation],
          accountId: this.userService.user ? this.userService.user.id : 0,
          greaterThan: range.min.toString(),
          lessThan: range.max.toString(),
          recentGreaterThan: recentRange.min.toString()
        }).subscribe(
          ({ data }) => {
            this.events = this.processEvents(data.searchEvents.nodes);
            console.log('Events: ', this.events);
            this.eventsObservable.next(this.events);
            this.eventsInited = true;
            this.collapsed = true;
          }
        );
      } else {
        this.searchEventsbyRegionGQL.fetch({
          query: this.searchQueryControl.value,
          regionName: this.appService.locationsObj[this.selectedLocation],
          accountId: this.userService.user ? this.userService.user.id : 0,
          greaterThan: range.min.toString(),
          lessThan: range.max.toString(),
          recentGreaterThan: recentRange.min.toString()
        }).subscribe(
          ({ data }) => {
            const eventsArr = [];
            data.regionByName.citiesByRegion.nodes.forEach((city) => {
              city.venuesByCity.nodes.forEach((venue) => {
                venue.eventsByVenue.nodes.forEach((event) => {
                  eventsArr.push(event);
                });
              });
            });

            this.events = this.processEvents(eventsArr);
            console.log('Events: ', this.events);
            this.eventsObservable.next(this.events);
            this.eventsInited = true;
            this.collapsed = true;
          }
        );
      }
    }
  }

  processEvents(events) {
    // loop through and create marker arr. Sort of borked atm
    // if (+venue.lat) this.eventMarkers.push({ name: event.name, lat: +venue.lat, lon: +venue.lon });

    // identify if it is newly added
    const eventsCheckedNew = this.eventService.identifyNew(events);

    // sort based on start date
    const processedEvents = eventsCheckedNew.sort((a, b) => (a.startDate > b.startDate) ? 1 : ((b.startDate > a.startDate) ? -1 : 0));
    return processedEvents;
  }

  submitSearch(e) {
    e.preventDefault();

    this.changeUrlPath();
  }

  setLocation(location: string) {
    this.selectedLocation = location;
    this.location = location;

    // add location to cookie for future
    this.cookieService.set('edm-location', this.selectedLocation);
  }

  selectDate(date) {
    console.log(date);
    this.dateRange = date;
  }

  changeUrlPath() {
    console.log(this.selectedLocation);
    // add query params to address and also kicks off search events in the router subscription
    this.routerService.navigateToPage(
      '/events',
      {
        location: this.selectedLocation,
        dates: this.dateRange ? this.dateRange : null,
        query: this.searchQueryControl.value ? this.searchQueryControl.value : null,
        new: this.recentFilter ? this.recentFilter : null
      });
  }
}
