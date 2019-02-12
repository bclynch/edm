import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, SubscriptionLike } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss']
})
export class LocationSearchComponent implements OnInit, OnDestroy {
  @Input() autocomplete = 'on';
  @Input() placeholder = '';
  @Input() value = '';
  @Output() selected: EventEmitter<string> = new EventEmitter<string>();

  myControl = new FormControl();
  options: string[];
  filteredOptions: Observable<any>;

  initSubscription: SubscriptionLike;

  constructor(
    private appService: AppService
  ) {
    this.initSubscription = this.appService.appInited.subscribe((inited) =>  { if (inited) this.init(); });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.initSubscription.unsubscribe();
  }

  init() {
    this.options = this.appService.locations;
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => {
          return this._filter(value);
        })
      );
  }

  private _filter(value: string): string[] {
    let filteredArr = [];
    if (value) {
      const filterValue = value.toLowerCase();

      filteredArr = this.options.filter(option => option.toLowerCase().includes(filterValue));
    }
    filteredArr.unshift('📍 Use my current location');
    return filteredArr;
  }
}
