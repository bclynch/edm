import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  location: string;

  constructor(
    private routerService: RouterService
  ) { }

  ngOnInit() {
    this.location = this.routerService.params.location;
  }

}
