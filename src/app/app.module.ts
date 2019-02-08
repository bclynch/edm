import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from 'src/app/shared/shared.module';

// Apollo
import { GraphQLModule } from './graphql.module';

// Services
import { RoleGuardService } from './services/roleGuard.service';
import { UtilService } from './services/util.service';
import { RouterService } from './services/router.service';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [
    RoleGuardService,
    UtilService,
    RouterService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
