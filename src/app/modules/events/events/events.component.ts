import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';
import { SearchEventsGQL } from 'src/app/generated/graphql';
import { BehaviorSubject, SubscriptionLike } from 'rxjs';
import { MapsAPILoader } from '@agm/core';
import { UtilService } from 'src/app/services/util.service';
import { UserService } from 'src/app/services/user.service';
import { AppService } from 'src/app/services/app.service';
import { FormControl } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';

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
  selectedLocation: string;
  initSubscription: SubscriptionLike;

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
    private searchEventsGQL: SearchEventsGQL,
    private mapsAPILoader: MapsAPILoader,
    private utilService: UtilService,
    private userService: UserService,
    private appService: AppService,
    private eventService: EventService
  ) {
    this.initSubscription = this.appService.appInited.subscribe(
      (inited) =>  {
        if (inited) {
          this.location = this.routerService.params.location;
          this.dateRange = this.routerService.params.dates ? this.routerService.params.dates : 'any';
          this.searchQueryControl.setValue(this.routerService.params.query ? this.routerService.params.query : '');
          this.selectedLocation = this.location;
          if (this.location) {
            this.searchEvents();
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
    this.searchEventsGQL.fetch({
      query: this.searchQueryControl.value,
      cityId: this.appService.locationsObj[this.selectedLocation],
      accountId: this.userService.user ? this.userService.user.id : 0,
      greaterThan: range.min.toString(),
      lessThan: range.max.toString()
    }).subscribe(
      (result) => {
        this.events = this.processEvents(result.data.searchEvents.nodes);
        console.log(this.events);
        this.eventsObservable.next(this.events);

        // add query params to address
        if (this.searchQueryControl.value) {
          this.routerService.navigateToPage('/events', { location: this.selectedLocation, dates: this.dateRange, query: this.searchQueryControl.value });
        } else {
          this.routerService.navigateToPage('/events', { location: this.selectedLocation, dates: this.dateRange });
        }
      }
    );
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

    this.searchEvents();
  }

  setLocation(location: string) {
    this.selectedLocation = location;
    this.location = location;
  }

  selectDate(date) {
    console.log(date);
    this.dateRange = date;
  }
}
