import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  venues;

  createForm: FormGroup = this.fb.group({
    venue: ['', Validators.required],
    artists: this.fb.array([
      this.fb.control('')
    ]),
    link: ['',
      Validators.compose([
        Validators.required,
        Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
      ])
    ],
    date: ['', Validators.required],
  });

  formValidationMessages = {
    'venue': [
      { type: 'required', message: 'Venue is required' },
    ],
    'artists': [
      { type: 'required', message: 'An artist is required' },
    ],
    'link': [
      { type: 'required', message: 'Event link is required' },
      { type: 'pattern', message: 'Enter a valid url' }
    ],
    'date': [
      { type: 'required', message: 'Date is required' }
    ]
  };

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
  }

  init() {
    // this.venues = this.myControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => {
    //       return this._filter(value);
    //     })
    //   );
  }

  addArtist() {
    this.artists.push(this.fb.control(''));
  }

  get artists() {
    return this.createForm.get('artists') as FormArray;
  }

  create() {
    console.log(this.createForm.value);
  }

  selectVenue() {

  }
}
