import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ENV } from '../environments/environment';

// Apollo
import { GraphQLModule } from './graphql.module';

// Services
import { CookieService } from 'ngx-cookie-service';
import { RoleGuardService } from './services/roleGuard.service';
import { UtilService } from './services/util.service';
import { RouterService } from './services/router.service';
import { AppService } from './services/app.service';
import { DISQUS_SHORTNAME } from 'ngx-disqus';

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
    CookieService,
    AppService,
    { provide: DISQUS_SHORTNAME, useValue: ENV.disqusShortname }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
