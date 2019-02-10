import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
  MatNativeDateModule
} from '@angular/material';

// components
import { PagewrapperComponent } from './pagewrapper/pagewrapper.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DirectivesModule } from '../directives/directives.module';
import { MobileNavDialogueComponent } from './mobile-nav-dialogue/mobile-nav-dialogue.component';

@NgModule({
  entryComponents: [
    MobileNavDialogueComponent
  ],
  declarations: [
    PagewrapperComponent,
    FooterComponent,
    NavbarComponent,
    MobileNavDialogueComponent,
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
    DirectivesModule,
    RouterModule
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
    PagewrapperComponent,
    FooterComponent,
    NavbarComponent
  ]
})
export class SharedModule { }
