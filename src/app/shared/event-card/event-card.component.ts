import { Component, OnInit, Input } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { ENV } from '../../../environments/environment';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input() name: string;
  @Input() location: string;
  @Input() date: number;
  @Input() id: string;
  @Input() externalUrl: string;

  faExternalLinkAlt = faExternalLinkAlt;

  constructor(
    private utilService: UtilService
  ) { }

  ngOnInit() {
  }

  share() {
    this.utilService.share(`${ENV.siteBaseURL}/event/${this.id}`);
  }
}
