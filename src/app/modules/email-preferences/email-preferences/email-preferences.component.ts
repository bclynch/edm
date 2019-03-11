import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-email-preferences',
  templateUrl: './email-preferences.component.html',
  styleUrls: ['./email-preferences.component.scss']
})
export class EmailPreferencesComponent implements OnInit {

  frequency = 'Never';
  frequencies = [
    'Every day',
    'Three times a week',
    'Two times a week',
    'Once a week',
    'Once every two weeks',
    'Never'
  ];

  constructor(
    private appService: AppService
  ) {
    this.appService.modPageMeta('Email Preference Settings', 'Modify email settings for your EDM Flare account');
  }

  ngOnInit() {
  }

  changeFrequency() {
    console.log(this.frequency);
  }
}
