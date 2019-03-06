import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private appService: AppService
  ) {
    this.appService.modPageMeta('Settings', 'Modify settings for your EDM Flare account');
  }

  ngOnInit() {
  }

}
