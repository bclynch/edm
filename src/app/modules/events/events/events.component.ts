import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';
import { EventsByCityGQL } from 'src/app/generated/graphql';
import { BehaviorSubject, SubscriptionLike } from 'rxjs';
import { MapsAPILoader } from '@agm/core';
import { UtilService } from 'src/app/services/util.service';
import { UserService } from 'src/app/services/user.service';
import { AppService } from 'src/app/services/app.service';
import * as moment from 'moment';

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

  location: string;
  dateRange: string;
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
    private eventsByCityGQL: EventsByCityGQL,
    private mapsAPILoader: MapsAPILoader,
    private utilService: UtilService,
    private userService: UserService,
    private appService: AppService
  ) {
    this.initSubscription = this.appService.appInited.subscribe(
      (inited) =>  {
        if (inited) {
          this.location = this.routerService.params.location;
          this.dateRange = this.routerService.params.dates ? this.routerService.params.dates : 'any';
          this.selectedLocation = this.location;
          if (this.location) {
            this.dateFilter(this.dateRange);
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

  fetchEvents(location: string, minDate: number, maxDate: number) {
    return new Promise((resolve, reject) => {
      this.eventsByCityGQL.fetch({ city: location, accountId: this.userService.user ? this.userService.user.id : 0, greaterThan: minDate.toString(), lessThan: maxDate.toString() }).subscribe(
        (result) => {
          // if arr is empty the location does not exist
          if (result.data.allCities.nodes.length) {
            this.events = this.processEvents(result.data.allCities.nodes[0]);
            console.log(this.events);
            this.eventsObservable.next(this.events);
            resolve();
          }
        }
      );
    });
  }

  processEvents(cityObj) {
    const eventsArr: Event[] = [];
    cityObj.venuesByCity.nodes.forEach((venue) => {
      const venueName = venue.name;
      venue.eventsByVenue.nodes.forEach((event) => {
        event['venue'] = venueName;
        eventsArr.push(event);

        // generate markers for event
        if (+venue.lat) this.eventMarkers.push({ name: event.name, lat: +venue.lat, lon: +venue.lon });
      });
    });
    // sort based on start date
    const processedEvents = eventsArr.sort((a, b) => (a.startDate > b.startDate) ? 1 : ((b.startDate > a.startDate) ? -1 : 0));
    return processedEvents;
  }

  searchEvents(e) {
    e.preventDefault();

    // this.fetchAllEvents(this.selectedLocation);

    // add query params to address
    this.routerService.navigateToPage('/events', { location: this.selectedLocation, dates: this.dateRange });
  }

  setLocation(location: string) {
    this.selectedLocation = location;
    this.location = location;
  }

  dateFilter(filter) {
    this.dateRange = filter;
    const range = this.utilService.calculateDateRange(filter);
    this.fetchEvents(this.selectedLocation, range.min, range.max);
    // add query params to address
    this.routerService.navigateToPage('/events', { location: this.selectedLocation, dates: this.dateRange });
  }
}
