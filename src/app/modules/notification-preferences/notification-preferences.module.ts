import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationPreferencesComponent } from './notification-preferences/notification-preferences.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: NotificationPreferencesComponent
  }
];

@NgModule({
  declarations: [NotificationPreferencesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule
  ]
})
export class NotificationPreferencesModule { }
