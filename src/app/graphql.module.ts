import { NgModule } from '@angular/core';
import { ApolloModule, Apollo } from 'apollo-angular';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { ENV } from '../environments/environment';

declare global {
  interface Window {
    CSRF_TOKEN: any;
  }
}

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
    httpLink: HttpLink
  ) {

    const http = httpLink.create({ uri: ENV.apolloBaseURL });
    const cache = new InMemoryCache({
      dataIdFromObject: o => o.id
    });

    const logoutOn401ErrorLink = onError(({ networkError }) => {
      if (networkError) { // && networkError.status === 401
        console.log('NETWORK ISSUE: ', networkError);
        // Logout
      }
    });
    const csrfMiddlewareLink = new ApolloLink((operation, forward) => {
      if (typeof window.CSRF_TOKEN === 'string') {
        operation.setContext({
          headers: {
            'X-Token': window.CSRF_TOKEN,
          },
        });
      }
      return forward(operation);
    });

    const link = ApolloLink.from([
      logoutOn401ErrorLink,
      csrfMiddlewareLink,
      http
    ]);
    const resolvers = {
      Mutation: {
        // eslint-disable-next-line no-shadow
        updateNetworkStatus: (_, { isConnected }, { cache }) => {
          cache.writeData({ data: { isConnected } });
          return null;
        },
      },
    };

    apollo.create({
      link,
      cache,
      resolvers
    });
  }
}
