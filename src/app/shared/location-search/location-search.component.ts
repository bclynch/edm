import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, SubscriptionLike } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss']
})
export class LocationSearchComponent implements OnInit, OnDestroy, OnChanges {
  @Input() autocomplete = 'on';
  @Input() placeholder = '';
  @Input() value = '';
  @Input() floatLabel = true;
  @Output() selected: EventEmitter<string> = new EventEmitter<string>();

  myControl = new FormControl();
  options: string[];
  filteredOptions: Observable<any>;

  initSubscription: SubscriptionLike;

  constructor(
    private appService: AppService,
    private locationService: LocationService
  ) {
    this.initSubscription = this.appService.appInited.subscribe((inited) =>  { if (inited) this.init(); });
  }

  ngOnInit() {
  }

  ngOnChanges(change) {
    if (change.value && change.value.currentValue) this.myControl.setValue(change.value.currentValue);
    if (change.value && change.value.currentValue && change.value.currentValue.split('-')[0] === 'reset') this.myControl.setValue('');
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
    // filteredArr.unshift('📍 Use my current location');
    return filteredArr;
  }

  resetInput(e) {
    // this is being triggered by the enter button for some reason so checking to see if this prop is there
    // if so it was a real mouse click otherwise we ignore
    if (e.detail) this.myControl.reset();
  }

  selectOption() {
    if (this.myControl.value === '📍 Use my current location') {
      this.myControl.setValue('Finding Location...');
      navigator.geolocation.getCurrentPosition(
        (data) => {
          console.log(data.coords);
          // find city based on coords
          this.locationService.reverseGeocodeCoords(data.coords.latitude, data.coords.longitude).subscribe(
            result => {
              console.log(result.results);
              this.myControl.setValue(result.results[0].formatted_address.split(',')[1]);

              // will need to run an algorithm to find nearest region / city to the location
              this.selected.emit(this.myControl.value);
            }
          );
        },
        (err) => {
          console.log(err);
          this.myControl.setValue('');
        }
      );
    } else {
      this.selected.emit(this.myControl.value);
    }
  }
}
