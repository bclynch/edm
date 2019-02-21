import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events/events.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule, ClusterManager } from '@agm/js-marker-clusterer';
import { ENV } from '../../../environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: EventsComponent
  }
];

@NgModule({
  declarations: [EventsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ScrollDispatchModule,
    AgmCoreModule.forRoot({
      apiKey: ENV.googleAPIKey,
    }),
    AgmJsMarkerClustererModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class EventsModule { }
