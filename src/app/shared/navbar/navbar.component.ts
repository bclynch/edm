import { Component, Input } from '@angular/core';

import { UtilService } from '../../services/util.service';
import { RouterService } from '../../services/router.service';
import { MobileNavDialogueComponent } from '../mobile-nav-dialogue/mobile-nav-dialogue.component';
import { SubscriptionLike } from 'rxjs';
import { MatDialog } from '@angular/material';

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
    private routerService: RouterService,
    public dialog: MatDialog,
  ) {

  }

  openMobileNav() {
    const dialogRef = this.dialog.open(MobileNavDialogueComponent, {
      panelClass: 'mobiledialog-panel'
    });

    this.dialogueSubscription = dialogRef.afterClosed().subscribe(result => {

      console.log(result);
      if (result) {
        switch (result) {
          case 'About':
            this.routerService.navigateToPage('/about');
            break;
          case 'Custom Fusion Posters':
            this.routerService.navigateToPage('/create/poster-generator/fusion-poster');
            break;
          case 'City Map Posters':
            this.routerService.navigateToPage('/create/poster-generator/map-poster');
            break;
          case 'Patent Posters':
            this.routerService.navigateToPage('/create/poster-generator/patent-poster');
            break;
          case 'Custom Trace Posters':
            this.routerService.navigateToPage('/create/poster-generator/trace-poster');
            break;
          case 'FAQs':
            this.routerService.modifyFragment('faqs', '/help');
            break;
          case 'Contact':
            this.routerService.modifyFragment('contact', '/help');
            break;
        }
      }
    });
  }

  // navigate(path) {
  //   if (path === 'faqs' || path === 'contact') {
  //     this.routerService.modifyFragment(path, '/help');
  //   } else {
  //     this.routerService.navigateToPage(path);
  //   }
  // }
}
