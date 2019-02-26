import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AnonGuardService as AnonGuard } from '../../services/anonGuard.service';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    canActivate: [AnonGuard]
  }
];

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class SettingsModule { }
