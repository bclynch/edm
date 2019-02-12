import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  selectedLocation: string;

  constructor(
    private routerService: RouterService
  ) { }

  ngOnInit() {
  }

  searchShows(e: Event) {
    e.preventDefault();

    this.routerService.navigateToPage('/events', { location: this.selectedLocation });
  }

  abc(location: string) {
    console.log(location);
    this.selectedLocation = location;
  }
}
