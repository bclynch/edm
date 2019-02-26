import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
   },
  {
    path: 'home',
    loadChildren: './modules/home/home.module#HomeModule',
  },
  {
    path: 'artist',
    loadChildren: './modules/artist/artist.module#ArtistModule',
  },
  {
    path: 'venue',
    loadChildren: './modules/venue/venue.module#VenueModule',
  },
  {
    path: 'events',
    loadChildren: './modules/events/events.module#EventsModule',
  },
  {
    path: 'event',
    loadChildren: './modules/event/event.module#EventModule',
  },
  {
    path: 'login',
    loadChildren: './modules/login/login.module#LoginModule',
  },
  {
    path: 'signup',
    loadChildren: './modules/signup/signup.module#SignupModule',
  },
  {
    path: 'user',
    loadChildren: './modules/user/user.module#UserModule',
  },
  {
    path: 'settings',
    loadChildren: './modules/settings/settings.module#SettingsModule',
  },
  {
    path: 'create-event',
    loadChildren: './modules/create/create.module#CreateModule',
  },
  { path: '**', loadChildren: './modules/not-found/not-found.module#NotFoundModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
