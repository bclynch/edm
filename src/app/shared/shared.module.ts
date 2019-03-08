import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ENV } from '../../environments/environment';

// Third party modules
import {
  MatButtonModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatDialogModule,
  MatInputModule,
  MatIconModule,
  MatBottomSheetModule,
  MatSnackBarModule,
  MatMenuModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatTabsModule,
} from '@angular/material';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { AgmCoreModule } from '@agm/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OverlayContainer, FullscreenOverlayContainer } from '@angular/cdk/overlay';

// components
import { PagewrapperComponent } from './pagewrapper/pagewrapper.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DirectivesModule } from '../directives/directives.module';
import { LocationSearchComponent } from './location-search/location-search.component';
import { EventCardComponent } from './event-card/event-card.component';
import { ShareDialogueComponent } from './share-dialogue/share-dialogue.component';
import { VenueMapComponent } from './venue-map/venue-map.component';
import { EventbriteCheckoutComponent } from './eventbrite-checkout/eventbrite-checkout.component';
import { SelectDateComponent } from './select-date/select-date.component';
import { EventCardAltComponent } from './event-card-alt/event-card-alt.component';

@NgModule({
  entryComponents: [
    ShareDialogueComponent,
    EventbriteCheckoutComponent,
  ],
  declarations: [
    PagewrapperComponent,
    FooterComponent,
    NavbarComponent,
    LocationSearchComponent,
    EventCardComponent,
    ShareDialogueComponent,
    VenueMapComponent,
    EventbriteCheckoutComponent,
    SelectDateComponent,
    EventCardAltComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatMenuModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatTabsModule,
    DirectivesModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ShareButtonsModule,
    AgmCoreModule.forRoot({
      apiKey: ENV.googleAPIKey,
    }),
    FontAwesomeModule
  ],
  exports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatMenuModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatTabsModule,
    PagewrapperComponent,
    FooterComponent,
    NavbarComponent,
    LocationSearchComponent,
    EventCardComponent,
    VenueMapComponent,
    SelectDateComponent,
    EventCardAltComponent
  ],
  providers: [
    {provide: OverlayContainer, useClass: FullscreenOverlayContainer}
  ]
})
export class SharedModule { }
