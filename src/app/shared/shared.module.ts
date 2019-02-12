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

// components
import { PagewrapperComponent } from './pagewrapper/pagewrapper.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DirectivesModule } from '../directives/directives.module';
import { MobileNavDialogueComponent } from './mobile-nav-dialogue/mobile-nav-dialogue.component';
import { LocationSearchComponent } from './location-search/location-search.component';

@NgModule({
  entryComponents: [
    MobileNavDialogueComponent
  ],
  declarations: [
    PagewrapperComponent,
    FooterComponent,
    NavbarComponent,
    MobileNavDialogueComponent,
    LocationSearchComponent,
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
    FormsModule
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
    LocationSearchComponent
  ]
})
export class SharedModule { }
