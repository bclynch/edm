import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchedComponent } from './watched/watched.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: WatchedComponent
  }
];

@NgModule({
  declarations: [WatchedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class WatchedModule { }
