import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
  MatAutocompleteModule
} from '@angular/material';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { AgmCoreModule } from '@agm/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// components
import { PagewrapperComponent } from './pagewrapper/pagewrapper.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DirectivesModule } from '../directives/directives.module';
import { LocationSearchComponent } from './location-search/location-search.component';
import { EventCardComponent } from './event-card/event-card.component';
import { ShareDialogueComponent } from './share-dialogue/share-dialogue.component';
import { VenueMapComponent } from './venue-map/venue-map.component';
import { ENV } from '../../environments/environment';
import { EventbriteCheckoutComponent } from './eventbrite-checkout/eventbrite-checkout.component';
import { OverlayContainer, FullscreenOverlayContainer } from '@angular/cdk/overlay';
import { SigninDialogueComponent } from './signin-dialogue/signin-dialogue.component';

@NgModule({
  entryComponents: [
    ShareDialogueComponent,
    EventbriteCheckoutComponent,
    SigninDialogueComponent
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
    SigninDialogueComponent
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
    PagewrapperComponent,
    FooterComponent,
    NavbarComponent,
    LocationSearchComponent,
    EventCardComponent,
    VenueMapComponent
  ],
  providers: [
    {provide: OverlayContainer, useClass: FullscreenOverlayContainer}
  ]
})
export class SharedModule { }
