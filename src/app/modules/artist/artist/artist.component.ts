import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistByNameGQL } from 'src/app/generated/graphql';
import { faTwitter, faFacebook, faInstagram, faSoundcloud, faYoutube, faSpotify, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  artist;
  events;
  socialOptions: { url: string, icon: IconDefinition }[];
  soundcloudUrl: SafeResourceUrl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private artistByNameGQL: ArtistByNameGQL,
    private sanitizer: DomSanitizer
  ) {
    this.artistByNameGQL.fetch({ name: this.activatedRoute.snapshot.paramMap.get('artistName') }).subscribe(
      (result) => {
        this.artist = result.data.artistByName;
        console.log(this.artist);
        this.events = this.artist.artistToEventsByArtistId.nodes.map((event) => event.eventByEventId);
        this.socialOptions = this.generateSocialOptions();
        // generate iframe url for soundcloud widget
        if (this.artist.soundcloudUsername) this.soundcloudUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://w.soundcloud.com/player/?url=https://soundcloud.com/${this.artist.soundcloudUsername}&amp;auto_play=false&amp;buying=false&amp;liking=false&amp;download=false&amp;sharing=false&amp;show_artwork=true&amp;show_comments=false&amp;show_playcount=false&amp;show_user=true&amp;hide_related=false&amp;visual=true&amp;start_track=0&amp;callback=true`);
      }
    );
  }

  ngOnInit() {
  }

  generateSocialOptions() {
    const socialOptions = [];
    if (this.artist.instagramUrl) socialOptions.push({ url: this.artist.instagramUrl, icon: faInstagram });
    if (this.artist.soundcloudUrl) socialOptions.push({ url: this.artist.soundcloudUrl, icon: faSoundcloud });
    if (this.artist.spotifyUrl) socialOptions.push({ url: this.artist.spotifyUrl, icon: faSpotify });
    if (this.artist.facebookUrl) socialOptions.push({ url: this.artist.facebookUrl, icon: faFacebook });
    if (this.artist.twitterUrl) socialOptions.push({ url: this.artist.twitterUrl, icon: faTwitter });
    if (this.artist.youtubeUrl) socialOptions.push({ url: this.artist.youtubeUrl, icon: faYoutube });
    if (this.artist.homepage) socialOptions.push({ url: this.artist.homepage, icon: faHome });
    return socialOptions;
  }
}
