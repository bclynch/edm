import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';
import { CookieService } from 'ngx-cookie-service';
import { SearchEventsByCityGQL, SearchEventsByRegionGQL } from 'src/app/generated/graphql';
import { AppService } from 'src/app/services/app.service';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';
import { SubscriptionLike } from 'rxjs';
import { faUsers, faBell, faCompactDisc } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  selectedLocation: string;
  dateRange = 'any';

  carouselSlides = [
    {
      image: 'assets/images/splash1.jpeg',
      tagline: 'The Next Rager'
    },
    {
      image: 'assets/images/splash2.jpeg',
      tagline: 'Your New Favorite Artist'
    },
    {
      image: 'assets/images/splash3.jpg',
      tagline: 'Your Local Community'
    }
  ];
  activeSlide = 0;

  featuredEvents;

  features = [
    {
      icon: faCompactDisc,
      header: 'Discover New Artists',
      content: 'Distillery tofu succulents kogi glossier shaman lo-fi. Banjo pitchfork cloud bread, leggings pickled forage marfa. Air plant neutra next level, coloring book slow-carb adaptogen art party. Chillwave beard pork belly locavore ethical raclette.'
    },
    {
      icon: faUsers,
      header: 'Find Community',
      content: 'Try-hard pop-up iPhone venmo vexillologist tumeric. Coloring book dreamcatcher everyday carry readymade, whatever prism butcher pork belly 90\'s. Flannel ugh kogi shabby chic glossier occupy vape banh mi live-edge, af hexagon photo booth jianbing.'
    },
    {
      icon: faBell,
      header: 'Get Updates On New Shows',
      content: 'Occupy venmo roof party biodiesel beard thundercats. Next level iPhone fixie church-key everyday carry etsy mustache roof party affogato portland authentic. Chambray literally brunch, marfa food truck freegan chicharrones letterpress jean shorts vinyl.'
    },
  ];

  initSubscription: SubscriptionLike;

  constructor(
    private routerService: RouterService,
    private cookieService: CookieService,
    private searchEventsByCityGQL: SearchEventsByCityGQL,
    private searchEventsByRegionGQL: SearchEventsByRegionGQL,
    private appService: AppService,
    private userService: UserService,
    private utilService: UtilService
  ) {
    this.appService.modPageMeta('Discover EDM events, information, and community', `EDM Flare is the most comprehensive and easy to use source for all things edm`);

    // queue up carousel
    setInterval(() => this.activeSlide = this.activeSlide === this.carouselSlides.length - 1 ? 0 : this.activeSlide += 1, 10000 );

    const location = this.cookieService.get('edm-location');
    if (location) {
      this.selectedLocation = location;
    } else {
      // default location for users
      this.cookieService.set('edm-location', 'Madison');
      this.selectedLocation = 'Madison';
    }

    this.initSubscription = this.appService.appInited.subscribe(
      (inited) =>  {
        if (inited) {
          // fetch featured
          const range = this.utilService.calculateDateRange('any');
          if (typeof this.appService.locationsObj[this.selectedLocation] === 'number') {
            this.searchEventsByCityGQL.fetch({
              query: '',
              cityId: this.appService.locationsObj[this.selectedLocation],
              accountId: this.userService.user ? this.userService.user.id : 0,
              greaterThan: range.min.toString(),
              lessThan: range.max.toString(),
              count: 12
            }).subscribe(
              ({ data }) => this.featuredEvents = data.searchEvents.nodes
            );
          } else {
            this.searchEventsByRegionGQL.fetch({
              query: '',
              regionName: this.appService.locationsObj[this.selectedLocation],
              accountId: this.userService.user ? this.userService.user.id : 0,
              greaterThan: range.min.toString(),
              lessThan: range.max.toString(),
              count: 12
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
                this.featuredEvents = eventsArr.length > 12 ? eventsArr.slice(0, 12) : eventsArr;
              }
            );
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

  searchShows(e) {
    e.preventDefault();

    // add location to cookie for future
    this.cookieService.set('edm-location', this.selectedLocation);

    this.routerService.navigateToPage('/events', { location: this.selectedLocation, dates: this.dateRange });
  }

  setLocation(location: string) {
    console.log(location);
    this.selectedLocation = location;
  }
}
