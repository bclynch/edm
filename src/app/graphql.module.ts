import { NgModule } from '@angular/core';
// Apollo
import { ApolloModule, Apollo } from 'apollo-angular';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { setContext } from 'apollo-link-context';
import { CookieService } from 'ngx-cookie-service';
import { ENV } from '../environments/environment';
import { HttpHeaders } from '@angular/common/http';

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

    let link;
    const token = this.cookieService.get('decorasaurus-token');
    if (token && token !== 'null') {
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
