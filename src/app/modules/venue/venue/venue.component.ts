import { Component, OnInit, OnDestroy } from '@angular/core';
import { VenueByNameGQL } from 'src/app/generated/graphql';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { SubscriptionLike } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import * as moment from 'moment';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.scss']
})
export class VenueComponent implements OnInit, OnDestroy {

  venue;

  initSubscription: SubscriptionLike;

  constructor(
    private venueByNameGQL: VenueByNameGQL,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private appService: AppService
  ) {
    const venue = this.activatedRoute.snapshot.paramMap.get('venueName');
    this.appService.modPageMeta(`${venue} Venue Information`, `Check out upcoming shows, maps, and information for venue ${venue}`);
    this.initSubscription = this.appService.appInited.subscribe(
      (inited) =>  {
        if (inited) {
          this.venueByNameGQL.fetch({
            name: venue,
            accountId: this.userService.user ? this.userService.user.id : 0,
            currentDate: moment().startOf('day').valueOf()
          }).subscribe(
            (result) => {
              this.venue = result.data.venueByName;
              console.log(this.venue);
            }
          );
        }
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.initSubscription.unsubscribe();
  }

  followVenue() {
    this.userService.follow(null, this.venue.name, this.venue.name).then(
      (followId) => this.venue.followListsByVenueId.nodes = [{ id: followId }]
    );
  }

  unfollowVenue() {
    this.userService.unfollow(this.venue.followListsByVenueId.nodes[0].id).then(
      () => this.venue.followListsByVenueId.nodes = []
    );
  }
}
