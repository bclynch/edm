import { Component, OnInit } from '@angular/core';
import { VenueByNameGQL } from 'src/app/generated/graphql';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.scss']
})
export class VenueComponent implements OnInit {

  venue;

  constructor(
    private venueByNameGQL: VenueByNameGQL,
    private activatedRoute: ActivatedRoute
  ) {
    console.log(this.activatedRoute.snapshot.paramMap.get('venueName'));
    this.venueByNameGQL.fetch({ name: this.activatedRoute.snapshot.paramMap.get('venueName') }).subscribe(
      (result) => {
        this.venue = result.data.venueByName;
        console.log(this.venue);
      }
    );
  }

  ngOnInit() {
  }

}
