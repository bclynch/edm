import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ShareDialogueComponent } from '../shared/share-dialogue/share-dialogue.component';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

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
    private http: Http
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
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title.split(' ').join('+')}&dates=${date}/${date}&details=For+details,+the+event+page+is+here:+${eventUrl}&location=${venueAddress ? venueAddress.split(' ').join('+') : ''}&sf=true&output=xml`;
  }

  calculateDateRange(filter): { min: number, max: number } {
    switch (filter) {
      case 'any':
        // if this thing is alive and breaks in 2099 then fuck it why not
        return { min: moment().startOf('day').valueOf(), max: 4102358400000 };
      case 'today':
        return { min: moment().startOf('day').valueOf(), max: moment().endOf('day').valueOf() };
      case 'tomorrow':
        return { min: moment().startOf('day').add(1, 'days').valueOf(), max: moment().endOf('day').add(1, 'days').valueOf() };
      case 'week':
        return { min: moment().startOf('day').valueOf(), max: moment().endOf('week').valueOf() };
      case 'nextWeek':
        return { min: moment().startOf('week').add(1, 'week').valueOf(), max: moment().endOf('week').add(1, 'week').valueOf() };
      case 'month':
        return { min: moment().startOf('day').valueOf(), max: moment().endOf('month').valueOf() };
      case 'nextMonth':
        return { min: this.getMonthDateRange(moment().month() === 11 ? moment().year() + 1 : moment().year(), moment().month() + 1).start.valueOf(), max: this.getMonthDateRange(moment().month() === 11 ? moment().year() + 1 : moment().year(), moment().month() + 1).end.valueOf() };
      // if they select their own range
      default:
        return { min: moment(filter, 'DD-MM-YYYY').startOf('day').valueOf(), max: moment(filter, 'DD-MM-YYYY').endOf('day').valueOf() };
    }
  }

  private getMonthDateRange(year, month) {
    // month in moment is 0 based, so 9 is actually october, subtract 1 to compensate
    // array is 'year', 'month', 'day', etc
    const startDate = moment([year, month]);

    // Clone the value before .endOf()
    const endDate = moment(startDate).endOf('month');

    // make sure to call toDate() for plain JavaScript date type
    return { start: startDate, end: endDate };
  }
}
