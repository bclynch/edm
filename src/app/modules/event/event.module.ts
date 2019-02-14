import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event/event.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DisqusModule } from 'ngx-disqus';

const routes: Routes = [
  {
    path: ':eventId',
    component: EventComponent
  }
];

@NgModule({
  declarations: [EventComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    DisqusModule
  ]
})
export class EventModule { }
