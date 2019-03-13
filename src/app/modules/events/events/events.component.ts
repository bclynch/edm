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

  // search props
  location: string;
  dateRange: string;
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
    private mapsAPILoader: MapsAPILoader,
    private utilService: UtilService,
    private userService: UserService,
    private appService: AppService,
    private eventService: EventService,
    private cookieService: CookieService,
    private route: ActivatedRoute
  ) {
    this.appService.modPageMeta(`${this.routerService.params.location} EDM Shows`, `Listing of upcoming edm events in ${this.routerService.params.location}`);
    this.initSubscription = this.appService.appInited.subscribe(
      (inited) =>  {
        if (inited) {
          // if params change need to fire off a new search
          this.paramsSubscription = this.route.queryParams.subscribe((params) => {
            this.location = params.location;
            this.dateRange = params.dates ? params.dates : 'any';
            this.searchQueryControl.setValue(params.query ? params.query : '');
            this.selectedLocation = this.location;
            this.searchEvents();
          });
          if (this.location) {
            this.changeUrlPath();
            // this.generateMap();
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

  generateMap() {
    // fitting the map to the markers
    this.mapsAPILoader.load().then(() => {
      this.latlngBounds = new window['google'].maps.LatLngBounds();
      this.eventMarkers.forEach((event) => this.latlngBounds.extend(new window['google'].maps.LatLng(event.lat, event.lon)));

      // grab map style
      this.utilService.getJSON('../../assets/mapStyles/unsaturated.json').subscribe( (data) => {
        this.mapStyle = data;
        this.mapInited = true;
      });
    });
  }

  searchEvents() {
    const range = this.utilService.calculateDateRange(this.dateRange);
    // if location does not exist then make empty arr
    if (!this.appService.locationsObj[this.selectedLocation]) {
      this.eventsObservable.next([]);
      this.eventsInited = true;
    } else {
      if (typeof this.appService.locationsObj[this.selectedLocation] === 'number') {
        this.searchEventsByCityGQL.fetch({
          query: this.searchQueryControl.value,
          cityId: this.appService.locationsObj[this.selectedLocation],
          accountId: this.userService.user ? this.userService.user.id : 0,
          greaterThan: range.min.toString(),
          lessThan: range.max.toString()
        }).subscribe(
          ({ data }) => {
            this.events = this.processEvents(data.searchEvents.nodes);
            console.log('Events: ', this.events);
            this.eventsObservable.next(this.events);
            this.eventsInited = true;
          }
        );
      } else {
        this.searchEventsbyRegionGQL.fetch({
          query: this.searchQueryControl.value,
          regionName: this.appService.locationsObj[this.selectedLocation],
          accountId: this.userService.user ? this.userService.user.id : 0,
          greaterThan: range.min.toString(),
          lessThan: range.max.toString()
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
    if (this.searchQueryControl.value) {
      this.routerService.navigateToPage('/events', { location: this.selectedLocation, dates: this.dateRange, query: this.searchQueryControl.value });
    } else {
      this.routerService.navigateToPage('/events', { location: this.selectedLocation, dates: this.dateRange });
    }
  }
}
