import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistComponent } from './artist/artist.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ArtistComponent
  }
];

@NgModule({
  declarations: [ArtistComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ArtistModule { }
