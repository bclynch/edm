import { Component, Input } from '@angular/core';

import { UtilService } from '../../services/util.service';
import { RouterService } from '../../services/router.service';
import { SubscriptionLike } from 'rxjs';

interface Section {
  label: string;
  value: string;
  subSections: {
    label: string;
    value: string;
    path: string;
  }[];
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() collapsibleNav: boolean;

  cartSubscription: SubscriptionLike;
  dialogueSubscription: SubscriptionLike;

  cartNumber: number;

  private _dismiss: any;
  sectionOptions: Section[] = [
    {
      label: 'Create',
      value: 'create',
      subSections: [
        {
          label: 'Fusion Posters',
          value: 'fusion',
          path: 'create/poster-generator/fusion-poster'
        },
        {
          label: 'City Map Posters',
          value: 'map',
          path: 'create/poster-generator/map-poster'
        },
        {
          label: 'Patent Posters',
          value: 'patent',
          path: 'create/poster-generator/patent-poster'
        },
        {
          label: 'Trace Posters',
          value: 'trace',
          path: 'create/poster-generator/trace-poster'
        }
      ]
    },
    {
      label: 'About',
      value: 'about',
      subSections: []
    },
    {
      label: 'Help',
      value: 'help',
      subSections: [
        {
          label: 'FAQs',
          value: 'faqs',
          path: 'faqs'
        },
        {
          label: 'Contact',
          value: 'contact',
          path: 'contact'
        }
      ]
    }
  ];
  activeSection: Section;

  searchActive = false;

  regions;

  constructor(
    private utilService: UtilService,
    private routerService: RouterService
  ) {

  }
}
