import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistByNameGQL } from 'src/app/generated/graphql';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  artist;

  constructor(
    private activatedRoute: ActivatedRoute,
    private artistByNameGQL: ArtistByNameGQL
  ) {
    this.artistByNameGQL.fetch({ name: this.activatedRoute.snapshot.paramMap.get('artistName') }).subscribe(
      (result) => {
        this.artist = result.data.artistByName;
        console.log(this.artist);
      }
    );
  }

  ngOnInit() {
  }

}
