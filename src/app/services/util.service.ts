import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ShareDialogueComponent } from '../shared/share-dialogue/share-dialogue.component';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { EventbriteCheckoutComponent } from '../shared/eventbrite-checkout/eventbrite-checkout.component';
import { PortalInjector, ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CONTAINER_DATA } from '../shared/eventbrite-checkout/eventbrite-overlay.token';

@Injectable()
export class UtilService {

  scrollDirection: 'up' | 'down' = 'up';
  checkScrollInfinite = false;
  allFetched = false;
  displayExploreNav = false;

  overlayRef: OverlayRef;

  private infiniteActiveSubject: BehaviorSubject<void>;
  public infiniteActive$: Observable<void>;
  public infiniteActive: boolean;

  constructor(
    public dialog: MatDialog,
    private http: Http,
    private overlay: Overlay,
    private injector: Injector
  ) {
    this.infiniteActiveSubject = new BehaviorSubject(null);
    this.infiniteActive$ = this.infiniteActiveSubject.asObservable();
    this.infiniteActive = false;
  }

  toggleInfiniteActive(state: boolean) {
    this.infiniteActive = state;
    this.infiniteActiveSubject.next(null);
  }

  share(shareUrl: string) {
    const dialogRef = this.dialog.open(ShareDialogueComponent, {
      panelClass: 'sharedialog-panel',
      data: { shareUrl }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(result);
    // });
  }

  getJSON(path: string) {
    return this.http.get(path).pipe(map((res) => res.json()));
  }

  addToCalendar(title: string, eventUrl: string, venueAddress: string, date: string) {
    // returns link for a tag href
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title.split(' ').join('+')}&dates=${date}/${date}&details=For+details,+the+event+page+is+here:+${eventUrl}&location=${venueAddress.split(' ').join('+')}&sf=true&output=xml`;
  }

  eventbriteCheckout(eventId: number) {
    this.overlayRef = this.overlay.create();
    const eventbritePortal = new ComponentPortal(EventbriteCheckoutComponent, null, this.createInjector({
      eventId
    }));
    this.overlayRef.attach(eventbritePortal);
  }

  private createInjector(dataToPass): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(CONTAINER_DATA, dataToPass);
    return new PortalInjector(this.injector, injectorTokens);
  }
}
