import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventByIdGQL } from 'src/app/generated/graphql';
import { UtilService } from 'src/app/services/util.service';
import { ENV } from '../../../../environments/environment';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  event;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventByIdGQL: EventByIdGQL,
    private utilService: UtilService
  ) {
    this.eventByIdGQL.fetch({ eventId: this.activatedRoute.snapshot.paramMap.get('eventId') }).subscribe(
      (result) => {
        this.event = result.data.eventById;
        console.log(this.event);
      }
    );
  }

  ngOnInit() {
  }

  share() {
    this.utilService.share(`${ENV.siteBaseURL}/event/${this.event.id}`);
  }
}
