import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';
import { EventsByCityGQL } from 'src/app/generated/graphql';
import { BehaviorSubject } from 'rxjs';

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
export class EventsComponent implements OnInit {

  location: string;
  events: Event[];
  eventsObservable = new BehaviorSubject<Event[]>([]);
  selectedLocation: string;

  constructor(
    private routerService: RouterService,
    private eventsByCityGQL: EventsByCityGQL
  ) { }

  ngOnInit() {
    this.location = this.routerService.params.location;
    this.selectedLocation = this.location;

    if (this.location) this.fetchEvents(this.location);
  }

  fetchEvents(location: string) {
    this.eventsByCityGQL.fetch({ city: location }).subscribe(
      (result) => {
        // if arr is empty the location does not exist
        if (result.data.allCities.nodes.length) {
          this.events = this.processEvents(result.data.allCities.nodes[0]);
          console.log(this.events);
          this.eventsObservable.next(this.events);
        }
      }
    );
  }

  processEvents(cityObj) {
    const eventsArr: Event[] = [];
    cityObj.venuesByCity.nodes.forEach((venue) => {
      const venueName = venue.name;
      venue.eventsByVenue.nodes.forEach((event) => {
        event['venue'] = venueName;
        eventsArr.push(event);
      });
    });
    // sort based on start date
    const processedEvents = eventsArr.sort((a, b) => (a.startDate > b.startDate) ? 1 : ((b.startDate > a.startDate) ? -1 : 0));
    return processedEvents;
  }

  searchEvents(e) {
    e.preventDefault();

    this.fetchEvents(this.selectedLocation);

    // add query params to address
    this.routerService.navigateToPage('/events', { location: this.selectedLocation });
  }

  abc(location: string) {
    this.selectedLocation = location;
    this.location = location;
  }
}
