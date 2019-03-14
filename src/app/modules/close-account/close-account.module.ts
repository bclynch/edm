import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloseAccountComponent } from './close-account/close-account.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: CloseAccountComponent
  }
];

@NgModule({
  declarations: [CloseAccountComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class CloseAccountModule { }