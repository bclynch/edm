import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailPreferencesComponent } from './email-preferences/email-preferences.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: EmailPreferencesComponent
  }
];

@NgModule({
  declarations: [EmailPreferencesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule
  ]
})
export class EmailPreferencesModule { }
