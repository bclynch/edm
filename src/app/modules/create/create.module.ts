import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AnonGuardService as AnonGuard } from '../../services/anonGuard.service';

const routes: Routes = [
  {
    path: '',
    component: CreateComponent,
    canActivate: [AnonGuard]
  }
];

@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class CreateModule { }
