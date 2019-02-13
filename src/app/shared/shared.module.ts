import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatDialogModule,
  MatInputModule,
  MatIconModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatSnackBarModule,
  MatSelectModule,
  MatCheckboxModule,
  MatRadioModule,
  MatButtonToggleModule,
  MatTabsModule,
  MatMenuModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule
} from '@angular/material';
import { ShareButtonsModule } from '@ngx-share/buttons';

// components
import { PagewrapperComponent } from './pagewrapper/pagewrapper.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DirectivesModule } from '../directives/directives.module';
import { LocationSearchComponent } from './location-search/location-search.component';
import { EventCardComponent } from './event-card/event-card.component';
import { ShareDialogueComponent } from './share-dialogue/share-dialogue.component';

@NgModule({
  entryComponents: [
    ShareDialogueComponent
  ],
  declarations: [
    PagewrapperComponent,
    FooterComponent,
    NavbarComponent,
    LocationSearchComponent,
    EventCardComponent,
    ShareDialogueComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatMenuModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    DirectivesModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ShareButtonsModule,
  ],
  exports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatMenuModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    PagewrapperComponent,
    FooterComponent,
    NavbarComponent,
    LocationSearchComponent,
    EventCardComponent
  ]
})
export class SharedModule { }
