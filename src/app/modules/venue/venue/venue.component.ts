import { Component, OnInit, OnDestroy } from '@angular/core';
import { VenueByNameGQL } from 'src/app/generated/graphql';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { SubscriptionLike } from 'rxjs';
import { AppService } from 'src/app/services/app.service';

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
    this.initSubscription = this.appService.appInited.subscribe(
      (inited) =>  {
        if (inited) {
          this.venueByNameGQL.fetch({
            name: this.activatedRoute.snapshot.paramMap.get('venueName'),
            accountId: this.userService.user ? this.userService.user.id : 0,
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
