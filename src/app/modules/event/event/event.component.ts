import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventByIdGQL } from 'src/app/generated/graphql';
import { UtilService } from 'src/app/services/util.service';
import { ENV } from '../../../../environments/environment';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { SubscriptionLike } from 'rxjs';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  event;
  disqusId: string;
  calendarLink: string;
  watchId;

  initSubscription: SubscriptionLike;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventByIdGQL: EventByIdGQL,
    private utilService: UtilService,
    private eventService: EventService,
    private userService: UserService,
    private appService: AppService
  ) {
    this.initSubscription = this.appService.appInited.subscribe(
      (inited) =>  {
        if (inited) {
          this.eventByIdGQL.fetch({
            eventId: this.activatedRoute.snapshot.paramMap.get('eventId'),
            accountId: this.userService.user ? this.userService.user.id : 0,
          }).subscribe(
            (result) => {
              this.event = result.data.eventById;
              console.log(this.event);
              this.disqusId = `event/${this.event.id}`;
              // generate add to calendar link
              this.calendarLink = this.utilService.addToCalendar(this.event.name, `${ENV.siteBaseURL}/event/${this.event.id}`, this.event.venueByVenue.address, (new Date(+this.event.startDate)).toISOString().replace(/-|:|\.\d\d\d/g, ''));
              this.watchId = this.event.watchListsByEventId.nodes[0] ? this.event.watchListsByEventId.nodes[0].id : null;
            }
          );
        }
      }
    );
  }

  ngOnInit() {
  }

  share() {
    this.utilService.share(`${ENV.siteBaseURL}/event/${this.event.id}`);
  }

  scrollTo(option: string): void {
    document.getElementById(option).scrollIntoView({behavior: 'smooth'});
  }

  addWatch() {
    this.eventService.addWatch(this.event.id).then(
      (id) => this.watchId = id
    );
  }

  removeWatch() {
    this.eventService.removeWatch(this.watchId).then(
      () => this.watchId = null
    );
  }
}
