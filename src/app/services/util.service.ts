import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ShareDialogueComponent } from '../shared/share-dialogue/share-dialogue.component';

@Injectable()
export class UtilService {

  scrollDirection: 'up' | 'down' = 'up';
  checkScrollInfinite = false;
  allFetched = false;
  displayExploreNav = false;

  private infiniteActiveSubject: BehaviorSubject<void>;
  public infiniteActive$: Observable<void>;
  public infiniteActive: boolean;

  constructor(
    public dialog: MatDialog,
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

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
