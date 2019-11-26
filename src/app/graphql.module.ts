import { NgModule } from '@angular/core';
import { ApolloModule, Apollo } from 'apollo-angular';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { setContext } from 'apollo-link-context';
import { CookieService } from 'ngx-cookie-service';
import { ENV } from '../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import decode from 'jwt-decode';

@NgModule({
  exports: [
    ApolloModule,
  ],
  imports: [
    HttpLinkModule
  ]
})
export class GraphQLModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
    private cookieService: CookieService
  ) {
    const http = httpLink.create({ uri: ENV.apolloBaseURL });

    let link, isExpired;
    const token = this.cookieService.get('edm-token');
    if (token) {
      // if the token is expired then continue as anon and delete token
      const { exp } = decode(this.cookieService.get('edm-token'));
      if (Date.now() / 1000 > exp) {
        isExpired = true;
        this.cookieService.delete('edm-token');
      }
    }
    if (token && token !== 'null' && !isExpired) {
      const middleware = setContext(() => ({
        headers: new HttpHeaders().set('Authorization', token ? `Bearer ${token}` : null)
      }));

      link = middleware.concat(http);
    } else {
      link = http;
    }

    apollo.create({
      link,
      cache: new InMemoryCache()
    });
  }
}
