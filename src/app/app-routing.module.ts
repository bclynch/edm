import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
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
    path: 'create-event',
    loadChildren: './modules/create/create.module#CreateModule',
  },
  {
    path: 'locations',
    loadChildren: './modules/locations/locations.module#LocationsModule',
  },
  {
    path: 'policies',
    loadChildren: './modules/policies/policies.module#PoliciesModule',
  },
  {
    path: 'about',
    loadChildren: './modules/about/about.module#AboutModule',
  },
  {
    path: 'contact',
    loadChildren: './modules/contact/contact.module#ContactModule',
  },
  {
    path: 'settings',
    redirectTo: 'settings/user-profile',
    pathMatch: 'full'
  },
  {
    path: 'settings/user-profile',
    loadChildren: './modules/user-profile/user-profile.module#UserProfileModule',
  },
  {
    path: 'settings/password',
    loadChildren: './modules/password/password.module#PasswordModule',
  },
  {
    path: 'settings/email-preferences',
    loadChildren: './modules/email-preferences/email-preferences.module#EmailPreferencesModule',
  },
  {
    path: 'settings/close-account',
    loadChildren: './modules/close-account/close-account.module#CloseAccountModule',
  },
  { path: '**', loadChildren: './modules/not-found/not-found.module#NotFoundModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
