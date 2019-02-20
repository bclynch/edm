import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  selectedLocation: string;

  constructor(
    private routerService: RouterService,
    private cookieService: CookieService
  ) {
    this.selectedLocation = this.cookieService.get('edm-location');
    console.log(this.selectedLocation);
  }

  ngOnInit() {
  }

  searchShows(e) {
    e.preventDefault();

    // add location to cookie for future
    this.cookieService.set('edm-location', this.selectedLocation);

    this.routerService.navigateToPage('/events', { location: this.selectedLocation });
  }

  setLocation(location: string) {
    console.log(location);
    this.selectedLocation = location;
  }
}
