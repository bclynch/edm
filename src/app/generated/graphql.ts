// ====================================================
// START: Apollo Angular template
// ====================================================

import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";

import gql from "graphql-tag";

// ====================================================
// Apollo Services
// ====================================================

@Injectable({
  providedIn: "root"
})
export class AccountByUsernameGQL extends Apollo.Query<
  AccountByUsername.Query,
  AccountByUsername.Variables
> {
  document: any = gql`
    query accountByUsername($username: String!, $accountId: Int!) {
      accountByUsername(username: $username) {
        username
        profilePhoto
        watchListsByAccountId {
          totalCount
          nodes {
            eventByEventId {
              id
              name
              startDate
              ticketproviderurl
              ticketproviderid
              venue
              createdAt
              artistToEventsByEventId(first: 1) {
                nodes {
                  artistByArtistId {
                    photo
                  }
                }
              }
              watchListsByEventId(
                filter: { accountId: { equalTo: $accountId } }
              ) {
                nodes {
                  id
                }
              }
            }
          }
        }
        followListsByAccountId {
          totalCount
          nodes {
            id
            artistByArtistId {
              name
              photo
            }
            venueByVenueId {
              name
              photo
            }
          }
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class AllLocationsGQL extends Apollo.Query<
  AllLocations.Query,
  AllLocations.Variables
> {
  document: any = gql`
    query allLocations {
      allCities {
        nodes {
          id
          name
          region
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class ArtistByNameGQL extends Apollo.Query<
  ArtistByName.Query,
  ArtistByName.Variables
> {
  document: any = gql`
    query artistByName($name: String!, $accountId: Int!) {
      artistByName(name: $name) {
        name
        description
        photo
        twitterUsername
        twitterUrl
        facebookUsername
        facebookUrl
        instagramUsername
        instagramUrl
        soundcloudUsername
        soundcloudUrl
        youtubeUsername
        youtubeUrl
        spotifyUrl
        homepage
        followListsByArtistId(filter: { accountId: { equalTo: $accountId } }) {
          nodes {
            id
          }
        }
        artistToEventsByArtistId {
          nodes {
            eventByEventId {
              name
              venue
              startDate
              id
              ticketproviderurl
              ticketproviderid
              watchListsByEventId(
                filter: { accountId: { equalTo: $accountId } }
              ) {
                nodes {
                  id
                }
              }
            }
          }
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class AuthenticateUserAccountGQL extends Apollo.Mutation<
  AuthenticateUserAccount.Mutation,
  AuthenticateUserAccount.Variables
> {
  document: any = gql`
    mutation authenticateUserAccount($email: String!, $password: String!) {
      authenticateUserAccount(input: { email: $email, password: $password }) {
        jwtToken
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class CreateFollowListGQL extends Apollo.Mutation<
  CreateFollowList.Mutation,
  CreateFollowList.Variables
> {
  document: any = gql`
    mutation createFollowList(
      $accountId: Int!
      $artistId: String
      $venueId: String
    ) {
      createFollowList(
        input: {
          followList: {
            accountId: $accountId
            artistId: $artistId
            venueId: $venueId
          }
        }
      ) {
        followList {
          id
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class CreateWatchListGQL extends Apollo.Mutation<
  CreateWatchList.Mutation,
  CreateWatchList.Variables
> {
  document: any = gql`
    mutation createWatchList($accountId: Int!, $eventId: String!) {
      createWatchList(
        input: { watchList: { accountId: $accountId, eventId: $eventId } }
      ) {
        watchList {
          id
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class CurrentAccountGQL extends Apollo.Query<
  CurrentAccount.Query,
  CurrentAccount.Variables
> {
  document: any = gql`
    query currentAccount {
      currentAccount {
        username
        profilePhoto
        id
        watchListsByAccountId {
          totalCount
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class EventByIdGQL extends Apollo.Query<
  EventById.Query,
  EventById.Variables
> {
  document: any = gql`
    query eventById($eventId: String!) {
      eventById(id: $eventId) {
        id
        name
        startDate
        endDate
        ticketproviderurl
        ticketproviderid
        description
        banner
        venueByVenue {
          name
          lat
          lon
          city
          address
        }
        artistToEventsByEventId {
          nodes {
            artistByArtistId {
              name
            }
          }
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class RegisterUserAccountGQL extends Apollo.Mutation<
  RegisterUserAccount.Mutation,
  RegisterUserAccount.Variables
> {
  document: any = gql`
    mutation registerUserAccount(
      $username: String!
      $email: String!
      $password: String!
    ) {
      registerUserAccount(
        input: { username: $username, email: $email, password: $password }
      ) {
        clientMutationId
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class RemoveFollowlistGQL extends Apollo.Mutation<
  RemoveFollowlist.Mutation,
  RemoveFollowlist.Variables
> {
  document: any = gql`
    mutation removeFollowlist($followListId: Int!) {
      deleteFollowListById(input: { id: $followListId }) {
        clientMutationId
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class RemoveWatchlistGQL extends Apollo.Mutation<
  RemoveWatchlist.Mutation,
  RemoveWatchlist.Variables
> {
  document: any = gql`
    mutation removeWatchlist($watchListId: Int!) {
      deleteWatchListById(input: { id: $watchListId }) {
        clientMutationId
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class SearchEventsGQL extends Apollo.Query<
  SearchEvents.Query,
  SearchEvents.Variables
> {
  document: any = gql`
    query searchEvents(
      $query: String!
      $cityId: Int!
      $accountId: Int!
      $greaterThan: BigInt!
      $lessThan: BigInt!
      $count: Int
    ) {
      searchEvents(
        query: $query
        cityid: $cityId
        filter: {
          startDate: {
            greaterThanOrEqualTo: $greaterThan
            lessThanOrEqualTo: $lessThan
          }
        }
        first: $count
      ) {
        nodes {
          id
          name
          startDate
          ticketproviderurl
          ticketproviderid
          venue
          createdAt
          venueByVenue {
            lat
            lon
          }
          artistToEventsByEventId(first: 1) {
            nodes {
              artistByArtistId {
                photo
              }
            }
          }
          watchListsByEventId(filter: { accountId: { equalTo: $accountId } }) {
            nodes {
              id
            }
          }
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class VenueByNameGQL extends Apollo.Query<
  VenueByName.Query,
  VenueByName.Variables
> {
  document: any = gql`
    query venueByName($name: String!, $accountId: Int!) {
      venueByName(name: $name) {
        name
        description
        lat
        lon
        city
        address
        photo
        logo
        followListsByVenueId(filter: { accountId: { equalTo: $accountId } }) {
          nodes {
            id
          }
        }
        eventsByVenue(orderBy: START_DATE_ASC) {
          nodes {
            name
            startDate
            ticketproviderurl
            ticketproviderid
            id
            artistToEventsByEventId(first: 1) {
              nodes {
                artistByArtistId {
                  photo
                }
              }
            }
          }
        }
      }
    }
  `;
}

// ====================================================
// END: Apollo Angular template
// ====================================================

export type Maybe<T> = T | null;

/** A condition to be used against `Account` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export interface AccountCondition {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<number>;
  /** Checks for equality with the object’s `username` field. */
  username?: Maybe<string>;
  /** Checks for equality with the object’s `profilePhoto` field. */
  profilePhoto?: Maybe<string>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<BigInt>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Datetime>;
}
/** A filter to be used against `Account` object types. All fields are combined with a logical ‘and.’ */
export interface AccountFilter {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `username` field. */
  username?: Maybe<StringFilter>;
  /** Filter by the object’s `profilePhoto` field. */
  profilePhoto?: Maybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<BigIntFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<AccountFilter[]>;
  /** Checks for any expressions in this list. */
  or?: Maybe<AccountFilter[]>;
  /** Negates the expression. */
  not?: Maybe<AccountFilter>;
}
/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export interface IntFilter {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<boolean>;
  /** Equal to the specified value. */
  equalTo?: Maybe<number>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<number>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<number>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<number>;
  /** Included in the specified list. */
  in?: Maybe<number[]>;
  /** Not included in the specified list. */
  notIn?: Maybe<number[]>;
  /** Less than the specified value. */
  lessThan?: Maybe<number>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<number>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<number>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<number>;
}
/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export interface StringFilter {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<boolean>;
  /** Equal to the specified value. */
  equalTo?: Maybe<string>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<string>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<string>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<string>;
  /** Included in the specified list. */
  in?: Maybe<string[]>;
  /** Not included in the specified list. */
  notIn?: Maybe<string[]>;
  /** Less than the specified value. */
  lessThan?: Maybe<string>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<string>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<string>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<string>;
  /** Contains the specified string (case-sensitive). */
  includes?: Maybe<string>;
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: Maybe<string>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: Maybe<string>;
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: Maybe<string>;
  /** Starts with the specified string (case-sensitive). */
  startsWith?: Maybe<string>;
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: Maybe<string>;
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: Maybe<string>;
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: Maybe<string>;
  /** Ends with the specified string (case-sensitive). */
  endsWith?: Maybe<string>;
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: Maybe<string>;
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: Maybe<string>;
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: Maybe<string>;
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like?: Maybe<string>;
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike?: Maybe<string>;
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive?: Maybe<string>;
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive?: Maybe<string>;
  /** Matches the specified pattern using the SQL standard's definition of a regular expression. */
  similarTo?: Maybe<string>;
  /** Does not match the specified pattern using the SQL standard's definition of a regular expression. */
  notSimilarTo?: Maybe<string>;
}
/** A filter to be used against BigInt fields. All fields are combined with a logical ‘and.’ */
export interface BigIntFilter {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<boolean>;
  /** Equal to the specified value. */
  equalTo?: Maybe<BigInt>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<BigInt>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<BigInt>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<BigInt>;
  /** Included in the specified list. */
  in?: Maybe<BigInt[]>;
  /** Not included in the specified list. */
  notIn?: Maybe<BigInt[]>;
  /** Less than the specified value. */
  lessThan?: Maybe<BigInt>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<BigInt>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<BigInt>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<BigInt>;
}
/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export interface DatetimeFilter {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<boolean>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Datetime>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Datetime>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Datetime>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Datetime>;
  /** Included in the specified list. */
  in?: Maybe<Datetime[]>;
  /** Not included in the specified list. */
  notIn?: Maybe<Datetime[]>;
  /** Less than the specified value. */
  lessThan?: Maybe<Datetime>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Datetime>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Datetime>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Datetime>;
}
/** A condition to be used against `Event` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export interface EventCondition {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<string>;
  /** Checks for equality with the object’s `venue` field. */
  venue?: Maybe<string>;
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<string>;
  /** Checks for equality with the object’s `description` field. */
  description?: Maybe<string>;
  /** Checks for equality with the object’s `type` field. */
  type?: Maybe<EventType>;
  /** Checks for equality with the object’s `startDate` field. */
  startDate?: Maybe<BigInt>;
  /** Checks for equality with the object’s `endDate` field. */
  endDate?: Maybe<BigInt>;
  /** Checks for equality with the object’s `ticketproviderid` field. */
  ticketproviderid?: Maybe<string>;
  /** Checks for equality with the object’s `ticketproviderurl` field. */
  ticketproviderurl?: Maybe<string>;
  /** Checks for equality with the object’s `banner` field. */
  banner?: Maybe<string>;
  /** Checks for equality with the object’s `approved` field. */
  approved?: Maybe<boolean>;
  /** Checks for equality with the object’s `contributor` field. */
  contributor?: Maybe<number>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<BigInt>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Datetime>;
}
/** A filter to be used against `Event` object types. All fields are combined with a logical ‘and.’ */
export interface EventFilter {
  /** Filter by the object’s `id` field. */
  id?: Maybe<StringFilter>;
  /** Filter by the object’s `venue` field. */
  venue?: Maybe<StringFilter>;
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Filter by the object’s `description` field. */
  description?: Maybe<StringFilter>;
  /** Filter by the object’s `type` field. */
  type?: Maybe<EventTypeFilter>;
  /** Filter by the object’s `startDate` field. */
  startDate?: Maybe<BigIntFilter>;
  /** Filter by the object’s `endDate` field. */
  endDate?: Maybe<BigIntFilter>;
  /** Filter by the object’s `ticketproviderid` field. */
  ticketproviderid?: Maybe<StringFilter>;
  /** Filter by the object’s `ticketproviderurl` field. */
  ticketproviderurl?: Maybe<StringFilter>;
  /** Filter by the object’s `banner` field. */
  banner?: Maybe<StringFilter>;
  /** Filter by the object’s `approved` field. */
  approved?: Maybe<BooleanFilter>;
  /** Filter by the object’s `contributor` field. */
  contributor?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<BigIntFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<EventFilter[]>;
  /** Checks for any expressions in this list. */
  or?: Maybe<EventFilter[]>;
  /** Negates the expression. */
  not?: Maybe<EventFilter>;
}
/** A filter to be used against EventType fields. All fields are combined with a logical ‘and.’ */
export interface EventTypeFilter {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<boolean>;
  /** Equal to the specified value. */
  equalTo?: Maybe<EventType>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<EventType>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<EventType>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<EventType>;
  /** Included in the specified list. */
  in?: Maybe<EventType[]>;
  /** Not included in the specified list. */
  notIn?: Maybe<EventType[]>;
}
/** A filter to be used against Boolean fields. All fields are combined with a logical ‘and.’ */
export interface BooleanFilter {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<boolean>;
  /** Equal to the specified value. */
  equalTo?: Maybe<boolean>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<boolean>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<boolean>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<boolean>;
  /** Included in the specified list. */
  in?: Maybe<boolean[]>;
  /** Not included in the specified list. */
  notIn?: Maybe<boolean[]>;
}
/** A condition to be used against `City` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export interface CityCondition {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<number>;
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<string>;
  /** Checks for equality with the object’s `description` field. */
  description?: Maybe<string>;
  /** Checks for equality with the object’s `photo` field. */
  photo?: Maybe<string>;
  /** Checks for equality with the object’s `region` field. */
  region?: Maybe<string>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<BigInt>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Datetime>;
}
/** A filter to be used against `City` object types. All fields are combined with a logical ‘and.’ */
export interface CityFilter {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Filter by the object’s `description` field. */
  description?: Maybe<StringFilter>;
  /** Filter by the object’s `photo` field. */
  photo?: Maybe<StringFilter>;
  /** Filter by the object’s `region` field. */
  region?: Maybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<BigIntFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<CityFilter[]>;
  /** Checks for any expressions in this list. */
  or?: Maybe<CityFilter[]>;
  /** Negates the expression. */
  not?: Maybe<CityFilter>;
}
/** A condition to be used against `Venue` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export interface VenueCondition {
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<string>;
  /** Checks for equality with the object’s `description` field. */
  description?: Maybe<string>;
  /** Checks for equality with the object’s `lat` field. */
  lat?: Maybe<BigFloat>;
  /** Checks for equality with the object’s `lon` field. */
  lon?: Maybe<BigFloat>;
  /** Checks for equality with the object’s `city` field. */
  city?: Maybe<number>;
  /** Checks for equality with the object’s `address` field. */
  address?: Maybe<string>;
  /** Checks for equality with the object’s `photo` field. */
  photo?: Maybe<string>;
  /** Checks for equality with the object’s `logo` field. */
  logo?: Maybe<string>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<BigInt>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Datetime>;
}
/** A filter to be used against `Venue` object types. All fields are combined with a logical ‘and.’ */
export interface VenueFilter {
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Filter by the object’s `description` field. */
  description?: Maybe<StringFilter>;
  /** Filter by the object’s `lat` field. */
  lat?: Maybe<BigFloatFilter>;
  /** Filter by the object’s `lon` field. */
  lon?: Maybe<BigFloatFilter>;
  /** Filter by the object’s `city` field. */
  city?: Maybe<IntFilter>;
  /** Filter by the object’s `address` field. */
  address?: Maybe<StringFilter>;
  /** Filter by the object’s `photo` field. */
  photo?: Maybe<StringFilter>;
  /** Filter by the object’s `logo` field. */
  logo?: Maybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<BigIntFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<VenueFilter[]>;
  /** Checks for any expressions in this list. */
  or?: Maybe<VenueFilter[]>;
  /** Negates the expression. */
  not?: Maybe<VenueFilter>;
}
/** A filter to be used against BigFloat fields. All fields are combined with a logical ‘and.’ */
export interface BigFloatFilter {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<boolean>;
  /** Equal to the specified value. */
  equalTo?: Maybe<BigFloat>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<BigFloat>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<BigFloat>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<BigFloat>;
  /** Included in the specified list. */
  in?: Maybe<BigFloat[]>;
  /** Not included in the specified list. */
  notIn?: Maybe<BigFloat[]>;
  /** Less than the specified value. */
  lessThan?: Maybe<BigFloat>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<BigFloat>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<BigFloat>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<BigFloat>;
}
/** A condition to be used against `FollowList` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export interface FollowListCondition {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<number>;
  /** Checks for equality with the object’s `accountId` field. */
  accountId?: Maybe<number>;
  /** Checks for equality with the object’s `artistId` field. */
  artistId?: Maybe<string>;
  /** Checks for equality with the object’s `venueId` field. */
  venueId?: Maybe<string>;
}
/** A filter to be used against `FollowList` object types. All fields are combined with a logical ‘and.’ */
export interface FollowListFilter {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `accountId` field. */
  accountId?: Maybe<IntFilter>;
  /** Filter by the object’s `artistId` field. */
  artistId?: Maybe<StringFilter>;
  /** Filter by the object’s `venueId` field. */
  venueId?: Maybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<FollowListFilter[]>;
  /** Checks for any expressions in this list. */
  or?: Maybe<FollowListFilter[]>;
  /** Negates the expression. */
  not?: Maybe<FollowListFilter>;
}
/** A condition to be used against `GenreToArtist` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export interface GenreToArtistCondition {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<number>;
  /** Checks for equality with the object’s `genreId` field. */
  genreId?: Maybe<string>;
  /** Checks for equality with the object’s `artistId` field. */
  artistId?: Maybe<string>;
}
/** A filter to be used against `GenreToArtist` object types. All fields are combined with a logical ‘and.’ */
export interface GenreToArtistFilter {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `genreId` field. */
  genreId?: Maybe<StringFilter>;
  /** Filter by the object’s `artistId` field. */
  artistId?: Maybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<GenreToArtistFilter[]>;
  /** Checks for any expressions in this list. */
  or?: Maybe<GenreToArtistFilter[]>;
  /** Negates the expression. */
  not?: Maybe<GenreToArtistFilter>;
}
/** A condition to be used against `ArtistToEvent` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export interface ArtistToEventCondition {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<number>;
  /** Checks for equality with the object’s `artistId` field. */
  artistId?: Maybe<string>;
  /** Checks for equality with the object’s `eventId` field. */
  eventId?: Maybe<string>;
}
/** A filter to be used against `ArtistToEvent` object types. All fields are combined with a logical ‘and.’ */
export interface ArtistToEventFilter {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `artistId` field. */
  artistId?: Maybe<StringFilter>;
  /** Filter by the object’s `eventId` field. */
  eventId?: Maybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<ArtistToEventFilter[]>;
  /** Checks for any expressions in this list. */
  or?: Maybe<ArtistToEventFilter[]>;
  /** Negates the expression. */
  not?: Maybe<ArtistToEventFilter>;
}
/** A condition to be used against `WatchList` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export interface WatchListCondition {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<number>;
  /** Checks for equality with the object’s `accountId` field. */
  accountId?: Maybe<number>;
  /** Checks for equality with the object’s `eventId` field. */
  eventId?: Maybe<string>;
}
/** A filter to be used against `WatchList` object types. All fields are combined with a logical ‘and.’ */
export interface WatchListFilter {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `accountId` field. */
  accountId?: Maybe<IntFilter>;
  /** Filter by the object’s `eventId` field. */
  eventId?: Maybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<WatchListFilter[]>;
  /** Checks for any expressions in this list. */
  or?: Maybe<WatchListFilter[]>;
  /** Negates the expression. */
  not?: Maybe<WatchListFilter>;
}
/** A condition to be used against `UserAccount` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export interface UserAccountCondition {
  /** Checks for equality with the object’s `accountId` field. */
  accountId?: Maybe<number>;
  /** Checks for equality with the object’s `email` field. */
  email?: Maybe<string>;
  /** Checks for equality with the object’s `passwordHash` field. */
  passwordHash?: Maybe<string>;
}
/** A filter to be used against `UserAccount` object types. All fields are combined with a logical ‘and.’ */
export interface UserAccountFilter {
  /** Filter by the object’s `accountId` field. */
  accountId?: Maybe<IntFilter>;
  /** Filter by the object’s `email` field. */
  email?: Maybe<StringFilter>;
  /** Filter by the object’s `passwordHash` field. */
  passwordHash?: Maybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<UserAccountFilter[]>;
  /** Checks for any expressions in this list. */
  or?: Maybe<UserAccountFilter[]>;
  /** Negates the expression. */
  not?: Maybe<UserAccountFilter>;
}
/** A condition to be used against `AdminAccount` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export interface AdminAccountCondition {
  /** Checks for equality with the object’s `accountId` field. */
  accountId?: Maybe<number>;
  /** Checks for equality with the object’s `email` field. */
  email?: Maybe<string>;
  /** Checks for equality with the object’s `passwordHash` field. */
  passwordHash?: Maybe<string>;
}
/** A filter to be used against `AdminAccount` object types. All fields are combined with a logical ‘and.’ */
export interface AdminAccountFilter {
  /** Filter by the object’s `accountId` field. */
  accountId?: Maybe<IntFilter>;
  /** Filter by the object’s `email` field. */
  email?: Maybe<StringFilter>;
  /** Filter by the object’s `passwordHash` field. */
  passwordHash?: Maybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<AdminAccountFilter[]>;
  /** Checks for any expressions in this list. */
  or?: Maybe<AdminAccountFilter[]>;
  /** Negates the expression. */
  not?: Maybe<AdminAccountFilter>;
}
/** A condition to be used against `Artist` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export interface ArtistCondition {
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<string>;
  /** Checks for equality with the object’s `description` field. */
  description?: Maybe<string>;
  /** Checks for equality with the object’s `photo` field. */
  photo?: Maybe<string>;
  /** Checks for equality with the object’s `twitterUsername` field. */
  twitterUsername?: Maybe<string>;
  /** Checks for equality with the object’s `twitterUrl` field. */
  twitterUrl?: Maybe<string>;
  /** Checks for equality with the object’s `facebookUsername` field. */
  facebookUsername?: Maybe<string>;
  /** Checks for equality with the object’s `facebookUrl` field. */
  facebookUrl?: Maybe<string>;
  /** Checks for equality with the object’s `instagramUsername` field. */
  instagramUsername?: Maybe<string>;
  /** Checks for equality with the object’s `instagramUrl` field. */
  instagramUrl?: Maybe<string>;
  /** Checks for equality with the object’s `soundcloudUsername` field. */
  soundcloudUsername?: Maybe<string>;
  /** Checks for equality with the object’s `soundcloudUrl` field. */
  soundcloudUrl?: Maybe<string>;
  /** Checks for equality with the object’s `youtubeUsername` field. */
  youtubeUsername?: Maybe<string>;
  /** Checks for equality with the object’s `youtubeUrl` field. */
  youtubeUrl?: Maybe<string>;
  /** Checks for equality with the object’s `spotifyUrl` field. */
  spotifyUrl?: Maybe<string>;
  /** Checks for equality with the object’s `homepage` field. */
  homepage?: Maybe<string>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<BigInt>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Datetime>;
}
/** A filter to be used against `Artist` object types. All fields are combined with a logical ‘and.’ */
export interface ArtistFilter {
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Filter by the object’s `description` field. */
  description?: Maybe<StringFilter>;
  /** Filter by the object’s `photo` field. */
  photo?: Maybe<StringFilter>;
  /** Filter by the object’s `twitterUsername` field. */
  twitterUsername?: Maybe<StringFilter>;
  /** Filter by the object’s `twitterUrl` field. */
  twitterUrl?: Maybe<StringFilter>;
  /** Filter by the object’s `facebookUsername` field. */
  facebookUsername?: Maybe<StringFilter>;
  /** Filter by the object’s `facebookUrl` field. */
  facebookUrl?: Maybe<StringFilter>;
  /** Filter by the object’s `instagramUsername` field. */
  instagramUsername?: Maybe<StringFilter>;
  /** Filter by the object’s `instagramUrl` field. */
  instagramUrl?: Maybe<StringFilter>;
  /** Filter by the object’s `soundcloudUsername` field. */
  soundcloudUsername?: Maybe<StringFilter>;
  /** Filter by the object’s `soundcloudUrl` field. */
  soundcloudUrl?: Maybe<StringFilter>;
  /** Filter by the object’s `youtubeUsername` field. */
  youtubeUsername?: Maybe<StringFilter>;
  /** Filter by the object’s `youtubeUrl` field. */
  youtubeUrl?: Maybe<StringFilter>;
  /** Filter by the object’s `spotifyUrl` field. */
  spotifyUrl?: Maybe<StringFilter>;
  /** Filter by the object’s `homepage` field. */
  homepage?: Maybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<BigIntFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<ArtistFilter[]>;
  /** Checks for any expressions in this list. */
  or?: Maybe<ArtistFilter[]>;
  /** Negates the expression. */
  not?: Maybe<ArtistFilter>;
}
/** A condition to be used against `Genre` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export interface GenreCondition {
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<string>;
  /** Checks for equality with the object’s `description` field. */
  description?: Maybe<string>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<BigInt>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Datetime>;
}
/** A filter to be used against `Genre` object types. All fields are combined with a logical ‘and.’ */
export interface GenreFilter {
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Filter by the object’s `description` field. */
  description?: Maybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<BigIntFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<GenreFilter[]>;
  /** Checks for any expressions in this list. */
  or?: Maybe<GenreFilter[]>;
  /** Negates the expression. */
  not?: Maybe<GenreFilter>;
}
/** A condition to be used against `Region` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export interface RegionCondition {
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<string>;
  /** Checks for equality with the object’s `description` field. */
  description?: Maybe<string>;
  /** Checks for equality with the object’s `photo` field. */
  photo?: Maybe<string>;
  /** Checks for equality with the object’s `country` field. */
  country?: Maybe<string>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<BigInt>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Datetime>;
}
/** A filter to be used against `Region` object types. All fields are combined with a logical ‘and.’ */
export interface RegionFilter {
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Filter by the object’s `description` field. */
  description?: Maybe<StringFilter>;
  /** Filter by the object’s `photo` field. */
  photo?: Maybe<StringFilter>;
  /** Filter by the object’s `country` field. */
  country?: Maybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<BigIntFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<RegionFilter[]>;
  /** Checks for any expressions in this list. */
  or?: Maybe<RegionFilter[]>;
  /** Negates the expression. */
  not?: Maybe<RegionFilter>;
}
/** All input for the create `Account` mutation. */
export interface CreateAccountInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The `Account` to be created by this mutation. */
  account: AccountInput;
}
/** An input for mutations affecting `Account` */
export interface AccountInput {
  /** Primary id for account */
  id?: Maybe<number>;
  /** username of account */
  username: string;
  /** Profile photo of account */
  profilePhoto?: Maybe<string>;
  /** When account created */
  createdAt?: Maybe<BigInt>;
  /** When account last updated */
  updatedAt?: Maybe<Datetime>;
}
/** All input for the create `Artist` mutation. */
export interface CreateArtistInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The `Artist` to be created by this mutation. */
  artist: ArtistInput;
}
/** An input for mutations affecting `Artist` */
export interface ArtistInput {
  /** Name of artist */
  name: string;
  /** Description of artist */
  description?: Maybe<string>;
  /** Photo of artist */
  photo?: Maybe<string>;
  /** Twitter username of artist */
  twitterUsername?: Maybe<string>;
  /** Twitter url of artist */
  twitterUrl?: Maybe<string>;
  /** Facebook username of artist */
  facebookUsername?: Maybe<string>;
  /** Facebook url of artist */
  facebookUrl?: Maybe<string>;
  /** Instagram username of artist */
  instagramUsername?: Maybe<string>;
  /** Instagram url of artist */
  instagramUrl?: Maybe<string>;
  /** Soundcloud username of artist */
  soundcloudUsername?: Maybe<string>;
  /** Soundcloud url of artist */
  soundcloudUrl?: Maybe<string>;
  /** Youtube username of artist */
  youtubeUsername?: Maybe<string>;
  /** Youtube url of artist */
  youtubeUrl?: Maybe<string>;
  /** Spotify url of artist */
  spotifyUrl?: Maybe<string>;
  /** Homepage url of artist */
  homepage?: Maybe<string>;
  /** When artist created */
  createdAt?: Maybe<BigInt>;
  /** When artist last updated */
  updatedAt?: Maybe<Datetime>;
}
/** All input for the create `ArtistToEvent` mutation. */
export interface CreateArtistToEventInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The `ArtistToEvent` to be created by this mutation. */
  artistToEvent: ArtistToEventInput;
}
/** An input for mutations affecting `ArtistToEvent` */
export interface ArtistToEventInput {
  /** Id of the row */
  id?: Maybe<number>;
  /** Id of the artist */
  artistId: string;
  /** Id of the event */
  eventId: string;
}
/** All input for the create `City` mutation. */
export interface CreateCityInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The `City` to be created by this mutation. */
  city: CityInput;
}
/** An input for mutations affecting `City` */
export interface CityInput {
  /** Primary key for city */
  id?: Maybe<number>;
  /** Name for city */
  name?: Maybe<string>;
  /** Description for city */
  description?: Maybe<string>;
  /** Photo for city */
  photo?: Maybe<string>;

  region?: Maybe<string>;
  /** When city created */
  createdAt?: Maybe<BigInt>;
  /** When city last updated */
  updatedAt?: Maybe<Datetime>;
}
/** All input for the create `Event` mutation. */
export interface CreateEventInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The `Event` to be created by this mutation. */
  event: EventInput;
}
/** An input for mutations affecting `Event` */
export interface EventInput {
  /** Primary id for event */
  id: string;

  venue: string;
  /** Name of event */
  name?: Maybe<string>;
  /** Description of event */
  description?: Maybe<string>;
  /** Type of event */
  type?: Maybe<EventType>;
  /** Start date of event */
  startDate: BigInt;
  /** End date of event */
  endDate?: Maybe<BigInt>;
  /** Id by the ticket provider useful for affiliate links */
  ticketproviderid?: Maybe<string>;
  /** URL by the ticket provider useful for affiliate links */
  ticketproviderurl?: Maybe<string>;
  /** Banner to display for event page */
  banner?: Maybe<string>;
  /** Whether to display event if it has been approved */
  approved?: Maybe<boolean>;
  /** Who submitted the event */
  contributor?: Maybe<number>;
  /** When event created */
  createdAt?: Maybe<BigInt>;
  /** When event last updated */
  updatedAt?: Maybe<Datetime>;
}
/** All input for the create `FollowList` mutation. */
export interface CreateFollowListInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The `FollowList` to be created by this mutation. */
  followList: FollowListInput;
}
/** An input for mutations affecting `FollowList` */
export interface FollowListInput {
  /** Id of the row */
  id?: Maybe<number>;
  /** Id of the account */
  accountId: number;
  /** Id of the artist */
  artistId?: Maybe<string>;
  /** Id of the venue */
  venueId?: Maybe<string>;
}
/** All input for the create `Genre` mutation. */
export interface CreateGenreInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The `Genre` to be created by this mutation. */
  genre: GenreInput;
}
/** An input for mutations affecting `Genre` */
export interface GenreInput {
  /** Name of genre and primary key */
  name: string;
  /** Description of genre */
  description?: Maybe<string>;
  /** When genre created */
  createdAt?: Maybe<BigInt>;
  /** When genre last updated */
  updatedAt?: Maybe<Datetime>;
}
/** All input for the create `GenreToArtist` mutation. */
export interface CreateGenreToArtistInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The `GenreToArtist` to be created by this mutation. */
  genreToArtist: GenreToArtistInput;
}
/** An input for mutations affecting `GenreToArtist` */
export interface GenreToArtistInput {
  /** Id of the row */
  id?: Maybe<number>;
  /** Id of the genre */
  genreId: string;
  /** Id of the artist */
  artistId: string;
}
/** All input for the create `Region` mutation. */
export interface CreateRegionInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The `Region` to be created by this mutation. */
  region: RegionInput;
}
/** An input for mutations affecting `Region` */
export interface RegionInput {
  /** Primary key and name for region */
  name: string;
  /** Description for region */
  description?: Maybe<string>;
  /** Photo for region */
  photo?: Maybe<string>;
  /** Country for region */
  country?: Maybe<string>;
  /** When region created */
  createdAt?: Maybe<BigInt>;
  /** When region last updated */
  updatedAt?: Maybe<Datetime>;
}
/** All input for the create `Venue` mutation. */
export interface CreateVenueInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The `Venue` to be created by this mutation. */
  venue: VenueInput;
}
/** An input for mutations affecting `Venue` */
export interface VenueInput {
  /** Name of venue and primary id */
  name: string;
  /** Description of venue */
  description?: Maybe<string>;
  /** Latitude of venue */
  lat?: Maybe<BigFloat>;
  /** Longitude of venue */
  lon?: Maybe<BigFloat>;
  /** City of venue */
  city: number;
  /** Address of venue */
  address?: Maybe<string>;
  /** Photo of venue */
  photo?: Maybe<string>;
  /** Logo of venue */
  logo?: Maybe<string>;
  /** When venue created */
  createdAt?: Maybe<BigInt>;
  /** When venue last updated */
  updatedAt?: Maybe<Datetime>;
}
/** All input for the create `WatchList` mutation. */
export interface CreateWatchListInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The `WatchList` to be created by this mutation. */
  watchList: WatchListInput;
}
/** An input for mutations affecting `WatchList` */
export interface WatchListInput {
  /** Id of the row */
  id?: Maybe<number>;
  /** Id of the account */
  accountId: number;
  /** Id of the event */
  eventId: string;
}
/** All input for the create `AdminAccount` mutation. */
export interface CreateAdminAccountInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The `AdminAccount` to be created by this mutation. */
  adminAccount: AdminAccountInput;
}
/** An input for mutations affecting `AdminAccount` */
export interface AdminAccountInput {
  /** The id of the user associated with this admin account. */
  accountId: number;
  /** The email address of the admin account. */
  email: string;
  /** An opaque hash of the admin account’s password. */
  passwordHash: string;
}
/** All input for the create `UserAccount` mutation. */
export interface CreateUserAccountInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The `UserAccount` to be created by this mutation. */
  userAccount: UserAccountInput;
}
/** An input for mutations affecting `UserAccount` */
export interface UserAccountInput {
  /** The id of the user associated with this account. */
  accountId: number;
  /** The email address of the account. */
  email: string;
  /** An opaque hash of the account’s password. */
  passwordHash: string;
}
/** All input for the `updateAccount` mutation. */
export interface UpdateAccountInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The globally unique `ID` which will identify a single `Account` to be updated. */
  nodeId: string;
  /** An object where the defined keys will be set on the `Account` being updated. */
  accountPatch: AccountPatch;
}
/** Represents an update to a `Account`. Fields that are set will be updated. */
export interface AccountPatch {
  /** Primary id for account */
  id?: Maybe<number>;
  /** username of account */
  username?: Maybe<string>;
  /** Profile photo of account */
  profilePhoto?: Maybe<string>;
  /** When account created */
  createdAt?: Maybe<BigInt>;
  /** When account last updated */
  updatedAt?: Maybe<Datetime>;
}
/** All input for the `updateAccountById` mutation. */
export interface UpdateAccountByIdInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** An object where the defined keys will be set on the `Account` being updated. */
  accountPatch: AccountPatch;
  /** Primary id for account */
  id: number;
}
/** All input for the `updateAccountByUsername` mutation. */
export interface UpdateAccountByUsernameInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** An object where the defined keys will be set on the `Account` being updated. */
  accountPatch: AccountPatch;
  /** username of account */
  username: string;
}
/** All input for the `updateArtist` mutation. */
export interface UpdateArtistInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The globally unique `ID` which will identify a single `Artist` to be updated. */
  nodeId: string;
  /** An object where the defined keys will be set on the `Artist` being updated. */
  artistPatch: ArtistPatch;
}
/** Represents an update to a `Artist`. Fields that are set will be updated. */
export interface ArtistPatch {
  /** Name of artist */
  name?: Maybe<string>;
  /** Description of artist */
  description?: Maybe<string>;
  /** Photo of artist */
  photo?: Maybe<string>;
  /** Twitter username of artist */
  twitterUsername?: Maybe<string>;
  /** Twitter url of artist */
  twitterUrl?: Maybe<string>;
  /** Facebook username of artist */
  facebookUsername?: Maybe<string>;
  /** Facebook url of artist */
  facebookUrl?: Maybe<string>;
  /** Instagram username of artist */
  instagramUsername?: Maybe<string>;
  /** Instagram url of artist */
  instagramUrl?: Maybe<string>;
  /** Soundcloud username of artist */
  soundcloudUsername?: Maybe<string>;
  /** Soundcloud url of artist */
  soundcloudUrl?: Maybe<string>;
  /** Youtube username of artist */
  youtubeUsername?: Maybe<string>;
  /** Youtube url of artist */
  youtubeUrl?: Maybe<string>;
  /** Spotify url of artist */
  spotifyUrl?: Maybe<string>;
  /** Homepage url of artist */
  homepage?: Maybe<string>;
  /** When artist created */
  createdAt?: Maybe<BigInt>;
  /** When artist last updated */
  updatedAt?: Maybe<Datetime>;
}
/** All input for the `updateArtistByName` mutation. */
export interface UpdateArtistByNameInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** An object where the defined keys will be set on the `Artist` being updated. */
  artistPatch: ArtistPatch;
  /** Name of artist */
  name: string;
}
/** All input for the `updateArtistToEvent` mutation. */
export interface UpdateArtistToEventInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The globally unique `ID` which will identify a single `ArtistToEvent` to be updated. */
  nodeId: string;
  /** An object where the defined keys will be set on the `ArtistToEvent` being updated. */
  artistToEventPatch: ArtistToEventPatch;
}
/** Represents an update to a `ArtistToEvent`. Fields that are set will be updated. */
export interface ArtistToEventPatch {
  /** Id of the row */
  id?: Maybe<number>;
  /** Id of the artist */
  artistId?: Maybe<string>;
  /** Id of the event */
  eventId?: Maybe<string>;
}
/** All input for the `updateArtistToEventById` mutation. */
export interface UpdateArtistToEventByIdInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** An object where the defined keys will be set on the `ArtistToEvent` being updated. */
  artistToEventPatch: ArtistToEventPatch;
  /** Id of the row */
  id: number;
}
/** All input for the `updateCity` mutation. */
export interface UpdateCityInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The globally unique `ID` which will identify a single `City` to be updated. */
  nodeId: string;
  /** An object where the defined keys will be set on the `City` being updated. */
  cityPatch: CityPatch;
}
/** Represents an update to a `City`. Fields that are set will be updated. */
export interface CityPatch {
  /** Primary key for city */
  id?: Maybe<number>;
  /** Name for city */
  name?: Maybe<string>;
  /** Description for city */
  description?: Maybe<string>;
  /** Photo for city */
  photo?: Maybe<string>;

  region?: Maybe<string>;
  /** When city created */
  createdAt?: Maybe<BigInt>;
  /** When city last updated */
  updatedAt?: Maybe<Datetime>;
}
/** All input for the `updateCityById` mutation. */
export interface UpdateCityByIdInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** An object where the defined keys will be set on the `City` being updated. */
  cityPatch: CityPatch;
  /** Primary key for city */
  id: number;
}
/** All input for the `updateEvent` mutation. */
export interface UpdateEventInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The globally unique `ID` which will identify a single `Event` to be updated. */
  nodeId: string;
  /** An object where the defined keys will be set on the `Event` being updated. */
  eventPatch: EventPatch;
}
/** Represents an update to a `Event`. Fields that are set will be updated. */
export interface EventPatch {
  /** Primary id for event */
  id?: Maybe<string>;

  venue?: Maybe<string>;
  /** Name of event */
  name?: Maybe<string>;
  /** Description of event */
  description?: Maybe<string>;
  /** Type of event */
  type?: Maybe<EventType>;
  /** Start date of event */
  startDate?: Maybe<BigInt>;
  /** End date of event */
  endDate?: Maybe<BigInt>;
  /** Id by the ticket provider useful for affiliate links */
  ticketproviderid?: Maybe<string>;
  /** URL by the ticket provider useful for affiliate links */
  ticketproviderurl?: Maybe<string>;
  /** Banner to display for event page */
  banner?: Maybe<string>;
  /** Whether to display event if it has been approved */
  approved?: Maybe<boolean>;
  /** Who submitted the event */
  contributor?: Maybe<number>;
  /** When event created */
  createdAt?: Maybe<BigInt>;
  /** When event last updated */
  updatedAt?: Maybe<Datetime>;
}
/** All input for the `updateEventById` mutation. */
export interface UpdateEventByIdInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** An object where the defined keys will be set on the `Event` being updated. */
  eventPatch: EventPatch;
  /** Primary id for event */
  id: string;
}
/** All input for the `updateFollowList` mutation. */
export interface UpdateFollowListInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The globally unique `ID` which will identify a single `FollowList` to be updated. */
  nodeId: string;
  /** An object where the defined keys will be set on the `FollowList` being updated. */
  followListPatch: FollowListPatch;
}
/** Represents an update to a `FollowList`. Fields that are set will be updated. */
export interface FollowListPatch {
  /** Id of the row */
  id?: Maybe<number>;
  /** Id of the account */
  accountId?: Maybe<number>;
  /** Id of the artist */
  artistId?: Maybe<string>;
  /** Id of the venue */
  venueId?: Maybe<string>;
}
/** All input for the `updateFollowListById` mutation. */
export interface UpdateFollowListByIdInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** An object where the defined keys will be set on the `FollowList` being updated. */
  followListPatch: FollowListPatch;
  /** Id of the row */
  id: number;
}
/** All input for the `updateGenre` mutation. */
export interface UpdateGenreInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The globally unique `ID` which will identify a single `Genre` to be updated. */
  nodeId: string;
  /** An object where the defined keys will be set on the `Genre` being updated. */
  genrePatch: GenrePatch;
}
/** Represents an update to a `Genre`. Fields that are set will be updated. */
export interface GenrePatch {
  /** Name of genre and primary key */
  name?: Maybe<string>;
  /** Description of genre */
  description?: Maybe<string>;
  /** When genre created */
  createdAt?: Maybe<BigInt>;
  /** When genre last updated */
  updatedAt?: Maybe<Datetime>;
}
/** All input for the `updateGenreByName` mutation. */
export interface UpdateGenreByNameInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** An object where the defined keys will be set on the `Genre` being updated. */
  genrePatch: GenrePatch;
  /** Name of genre and primary key */
  name: string;
}
/** All input for the `updateGenreToArtist` mutation. */
export interface UpdateGenreToArtistInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The globally unique `ID` which will identify a single `GenreToArtist` to be updated. */
  nodeId: string;
  /** An object where the defined keys will be set on the `GenreToArtist` being updated. */
  genreToArtistPatch: GenreToArtistPatch;
}
/** Represents an update to a `GenreToArtist`. Fields that are set will be updated. */
export interface GenreToArtistPatch {
  /** Id of the row */
  id?: Maybe<number>;
  /** Id of the genre */
  genreId?: Maybe<string>;
  /** Id of the artist */
  artistId?: Maybe<string>;
}
/** All input for the `updateGenreToArtistById` mutation. */
export interface UpdateGenreToArtistByIdInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** An object where the defined keys will be set on the `GenreToArtist` being updated. */
  genreToArtistPatch: GenreToArtistPatch;
  /** Id of the row */
  id: number;
}
/** All input for the `updateRegion` mutation. */
export interface UpdateRegionInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The globally unique `ID` which will identify a single `Region` to be updated. */
  nodeId: string;
  /** An object where the defined keys will be set on the `Region` being updated. */
  regionPatch: RegionPatch;
}
/** Represents an update to a `Region`. Fields that are set will be updated. */
export interface RegionPatch {
  /** Primary key and name for region */
  name?: Maybe<string>;
  /** Description for region */
  description?: Maybe<string>;
  /** Photo for region */
  photo?: Maybe<string>;
  /** Country for region */
  country?: Maybe<string>;
  /** When region created */
  createdAt?: Maybe<BigInt>;
  /** When region last updated */
  updatedAt?: Maybe<Datetime>;
}
/** All input for the `updateRegionByName` mutation. */
export interface UpdateRegionByNameInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** An object where the defined keys will be set on the `Region` being updated. */
  regionPatch: RegionPatch;
  /** Primary key and name for region */
  name: string;
}
/** All input for the `updateVenue` mutation. */
export interface UpdateVenueInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The globally unique `ID` which will identify a single `Venue` to be updated. */
  nodeId: string;
  /** An object where the defined keys will be set on the `Venue` being updated. */
  venuePatch: VenuePatch;
}
/** Represents an update to a `Venue`. Fields that are set will be updated. */
export interface VenuePatch {
  /** Name of venue and primary id */
  name?: Maybe<string>;
  /** Description of venue */
  description?: Maybe<string>;
  /** Latitude of venue */
  lat?: Maybe<BigFloat>;
  /** Longitude of venue */
  lon?: Maybe<BigFloat>;
  /** City of venue */
  city?: Maybe<number>;
  /** Address of venue */
  address?: Maybe<string>;
  /** Photo of venue */
  photo?: Maybe<string>;
  /** Logo of venue */
  logo?: Maybe<string>;
  /** When venue created */
  createdAt?: Maybe<BigInt>;
  /** When venue last updated */
  updatedAt?: Maybe<Datetime>;
}
/** All input for the `updateVenueByName` mutation. */
export interface UpdateVenueByNameInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** An object where the defined keys will be set on the `Venue` being updated. */
  venuePatch: VenuePatch;
  /** Name of venue and primary id */
  name: string;
}
/** All input for the `updateWatchList` mutation. */
export interface UpdateWatchListInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The globally unique `ID` which will identify a single `WatchList` to be updated. */
  nodeId: string;
  /** An object where the defined keys will be set on the `WatchList` being updated. */
  watchListPatch: WatchListPatch;
}
/** Represents an update to a `WatchList`. Fields that are set will be updated. */
export interface WatchListPatch {
  /** Id of the row */
  id?: Maybe<number>;
  /** Id of the account */
  accountId?: Maybe<number>;
  /** Id of the event */
  eventId?: Maybe<string>;
}
/** All input for the `updateWatchListById` mutation. */
export interface UpdateWatchListByIdInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** An object where the defined keys will be set on the `WatchList` being updated. */
  watchListPatch: WatchListPatch;
  /** Id of the row */
  id: number;
}
/** All input for the `updateAdminAccount` mutation. */
export interface UpdateAdminAccountInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The globally unique `ID` which will identify a single `AdminAccount` to be updated. */
  nodeId: string;
  /** An object where the defined keys will be set on the `AdminAccount` being updated. */
  adminAccountPatch: AdminAccountPatch;
}
/** Represents an update to a `AdminAccount`. Fields that are set will be updated. */
export interface AdminAccountPatch {
  /** The id of the user associated with this admin account. */
  accountId?: Maybe<number>;
  /** The email address of the admin account. */
  email?: Maybe<string>;
  /** An opaque hash of the admin account’s password. */
  passwordHash?: Maybe<string>;
}
/** All input for the `updateAdminAccountByAccountId` mutation. */
export interface UpdateAdminAccountByAccountIdInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** An object where the defined keys will be set on the `AdminAccount` being updated. */
  adminAccountPatch: AdminAccountPatch;
  /** The id of the user associated with this admin account. */
  accountId: number;
}
/** All input for the `updateAdminAccountByEmail` mutation. */
export interface UpdateAdminAccountByEmailInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** An object where the defined keys will be set on the `AdminAccount` being updated. */
  adminAccountPatch: AdminAccountPatch;
  /** The email address of the admin account. */
  email: string;
}
/** All input for the `updateUserAccount` mutation. */
export interface UpdateUserAccountInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The globally unique `ID` which will identify a single `UserAccount` to be updated. */
  nodeId: string;
  /** An object where the defined keys will be set on the `UserAccount` being updated. */
  userAccountPatch: UserAccountPatch;
}
/** Represents an update to a `UserAccount`. Fields that are set will be updated. */
export interface UserAccountPatch {
  /** The id of the user associated with this account. */
  accountId?: Maybe<number>;
  /** The email address of the account. */
  email?: Maybe<string>;
  /** An opaque hash of the account’s password. */
  passwordHash?: Maybe<string>;
}
/** All input for the `updateUserAccountByAccountId` mutation. */
export interface UpdateUserAccountByAccountIdInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** An object where the defined keys will be set on the `UserAccount` being updated. */
  userAccountPatch: UserAccountPatch;
  /** The id of the user associated with this account. */
  accountId: number;
}
/** All input for the `updateUserAccountByEmail` mutation. */
export interface UpdateUserAccountByEmailInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** An object where the defined keys will be set on the `UserAccount` being updated. */
  userAccountPatch: UserAccountPatch;
  /** The email address of the account. */
  email: string;
}
/** All input for the `deleteAccount` mutation. */
export interface DeleteAccountInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The globally unique `ID` which will identify a single `Account` to be deleted. */
  nodeId: string;
}
/** All input for the `deleteAccountById` mutation. */
export interface DeleteAccountByIdInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** Primary id for account */
  id: number;
}
/** All input for the `deleteAccountByUsername` mutation. */
export interface DeleteAccountByUsernameInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** username of account */
  username: string;
}
/** All input for the `deleteArtist` mutation. */
export interface DeleteArtistInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The globally unique `ID` which will identify a single `Artist` to be deleted. */
  nodeId: string;
}
/** All input for the `deleteArtistByName` mutation. */
export interface DeleteArtistByNameInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** Name of artist */
  name: string;
}
/** All input for the `deleteArtistToEvent` mutation. */
export interface DeleteArtistToEventInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The globally unique `ID` which will identify a single `ArtistToEvent` to be deleted. */
  nodeId: string;
}
/** All input for the `deleteArtistToEventById` mutation. */
export interface DeleteArtistToEventByIdInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** Id of the row */
  id: number;
}
/** All input for the `deleteCity` mutation. */
export interface DeleteCityInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The globally unique `ID` which will identify a single `City` to be deleted. */
  nodeId: string;
}
/** All input for the `deleteCityById` mutation. */
export interface DeleteCityByIdInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** Primary key for city */
  id: number;
}
/** All input for the `deleteEvent` mutation. */
export interface DeleteEventInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The globally unique `ID` which will identify a single `Event` to be deleted. */
  nodeId: string;
}
/** All input for the `deleteEventById` mutation. */
export interface DeleteEventByIdInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** Primary id for event */
  id: string;
}
/** All input for the `deleteFollowList` mutation. */
export interface DeleteFollowListInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The globally unique `ID` which will identify a single `FollowList` to be deleted. */
  nodeId: string;
}
/** All input for the `deleteFollowListById` mutation. */
export interface DeleteFollowListByIdInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** Id of the row */
  id: number;
}
/** All input for the `deleteGenre` mutation. */
export interface DeleteGenreInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The globally unique `ID` which will identify a single `Genre` to be deleted. */
  nodeId: string;
}
/** All input for the `deleteGenreByName` mutation. */
export interface DeleteGenreByNameInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** Name of genre and primary key */
  name: string;
}
/** All input for the `deleteGenreToArtist` mutation. */
export interface DeleteGenreToArtistInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The globally unique `ID` which will identify a single `GenreToArtist` to be deleted. */
  nodeId: string;
}
/** All input for the `deleteGenreToArtistById` mutation. */
export interface DeleteGenreToArtistByIdInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** Id of the row */
  id: number;
}
/** All input for the `deleteRegion` mutation. */
export interface DeleteRegionInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The globally unique `ID` which will identify a single `Region` to be deleted. */
  nodeId: string;
}
/** All input for the `deleteRegionByName` mutation. */
export interface DeleteRegionByNameInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** Primary key and name for region */
  name: string;
}
/** All input for the `deleteVenue` mutation. */
export interface DeleteVenueInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The globally unique `ID` which will identify a single `Venue` to be deleted. */
  nodeId: string;
}
/** All input for the `deleteVenueByName` mutation. */
export interface DeleteVenueByNameInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** Name of venue and primary id */
  name: string;
}
/** All input for the `deleteWatchList` mutation. */
export interface DeleteWatchListInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The globally unique `ID` which will identify a single `WatchList` to be deleted. */
  nodeId: string;
}
/** All input for the `deleteWatchListById` mutation. */
export interface DeleteWatchListByIdInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** Id of the row */
  id: number;
}
/** All input for the `deleteAdminAccount` mutation. */
export interface DeleteAdminAccountInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The globally unique `ID` which will identify a single `AdminAccount` to be deleted. */
  nodeId: string;
}
/** All input for the `deleteAdminAccountByAccountId` mutation. */
export interface DeleteAdminAccountByAccountIdInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The id of the user associated with this admin account. */
  accountId: number;
}
/** All input for the `deleteAdminAccountByEmail` mutation. */
export interface DeleteAdminAccountByEmailInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The email address of the admin account. */
  email: string;
}
/** All input for the `deleteUserAccount` mutation. */
export interface DeleteUserAccountInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The globally unique `ID` which will identify a single `UserAccount` to be deleted. */
  nodeId: string;
}
/** All input for the `deleteUserAccountByAccountId` mutation. */
export interface DeleteUserAccountByAccountIdInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The id of the user associated with this account. */
  accountId: number;
}
/** All input for the `deleteUserAccountByEmail` mutation. */
export interface DeleteUserAccountByEmailInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The email address of the account. */
  email: string;
}
/** All input for the `authenticateAdminAccount` mutation. */
export interface AuthenticateAdminAccountInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;

  email: string;

  password: string;
}
/** All input for the `authenticateUserAccount` mutation. */
export interface AuthenticateUserAccountInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;

  email: string;

  password: string;
}
/** All input for the `registerAdminAccount` mutation. */
export interface RegisterAdminAccountInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;

  username: string;

  email: string;

  password: string;
}
/** All input for the `registerUserAccount` mutation. */
export interface RegisterUserAccountInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;

  username: string;

  email: string;

  password: string;
}
/** All input for the `resetPassword` mutation. */
export interface ResetPasswordInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;

  email: string;
}
/** All input for the `updatePassword` mutation. */
export interface UpdatePasswordInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;

  userId: number;

  password: string;

  newPassword: string;
}
/** Methods to use when ordering `Account`. */
export enum AccountsOrderBy {
  Natural = "NATURAL",
  IdAsc = "ID_ASC",
  IdDesc = "ID_DESC",
  UsernameAsc = "USERNAME_ASC",
  UsernameDesc = "USERNAME_DESC",
  ProfilePhotoAsc = "PROFILE_PHOTO_ASC",
  ProfilePhotoDesc = "PROFILE_PHOTO_DESC",
  CreatedAtAsc = "CREATED_AT_ASC",
  CreatedAtDesc = "CREATED_AT_DESC",
  UpdatedAtAsc = "UPDATED_AT_ASC",
  UpdatedAtDesc = "UPDATED_AT_DESC",
  PrimaryKeyAsc = "PRIMARY_KEY_ASC",
  PrimaryKeyDesc = "PRIMARY_KEY_DESC"
}
/** Methods to use when ordering `Event`. */
export enum EventsOrderBy {
  Natural = "NATURAL",
  IdAsc = "ID_ASC",
  IdDesc = "ID_DESC",
  VenueAsc = "VENUE_ASC",
  VenueDesc = "VENUE_DESC",
  NameAsc = "NAME_ASC",
  NameDesc = "NAME_DESC",
  DescriptionAsc = "DESCRIPTION_ASC",
  DescriptionDesc = "DESCRIPTION_DESC",
  TypeAsc = "TYPE_ASC",
  TypeDesc = "TYPE_DESC",
  StartDateAsc = "START_DATE_ASC",
  StartDateDesc = "START_DATE_DESC",
  EndDateAsc = "END_DATE_ASC",
  EndDateDesc = "END_DATE_DESC",
  TicketprovideridAsc = "TICKETPROVIDERID_ASC",
  TicketprovideridDesc = "TICKETPROVIDERID_DESC",
  TicketproviderurlAsc = "TICKETPROVIDERURL_ASC",
  TicketproviderurlDesc = "TICKETPROVIDERURL_DESC",
  BannerAsc = "BANNER_ASC",
  BannerDesc = "BANNER_DESC",
  ApprovedAsc = "APPROVED_ASC",
  ApprovedDesc = "APPROVED_DESC",
  ContributorAsc = "CONTRIBUTOR_ASC",
  ContributorDesc = "CONTRIBUTOR_DESC",
  CreatedAtAsc = "CREATED_AT_ASC",
  CreatedAtDesc = "CREATED_AT_DESC",
  UpdatedAtAsc = "UPDATED_AT_ASC",
  UpdatedAtDesc = "UPDATED_AT_DESC",
  PrimaryKeyAsc = "PRIMARY_KEY_ASC",
  PrimaryKeyDesc = "PRIMARY_KEY_DESC"
}

export enum EventType {
  Eventbrite = "EVENTBRITE",
  Ticketfly = "TICKETFLY",
  Ticketmaster = "TICKETMASTER",
  Seetickets = "SEETICKETS",
  Etix = "ETIX",
  Other = "OTHER"
}
/** Methods to use when ordering `City`. */
export enum CitiesOrderBy {
  Natural = "NATURAL",
  IdAsc = "ID_ASC",
  IdDesc = "ID_DESC",
  NameAsc = "NAME_ASC",
  NameDesc = "NAME_DESC",
  DescriptionAsc = "DESCRIPTION_ASC",
  DescriptionDesc = "DESCRIPTION_DESC",
  PhotoAsc = "PHOTO_ASC",
  PhotoDesc = "PHOTO_DESC",
  RegionAsc = "REGION_ASC",
  RegionDesc = "REGION_DESC",
  CreatedAtAsc = "CREATED_AT_ASC",
  CreatedAtDesc = "CREATED_AT_DESC",
  UpdatedAtAsc = "UPDATED_AT_ASC",
  UpdatedAtDesc = "UPDATED_AT_DESC",
  PrimaryKeyAsc = "PRIMARY_KEY_ASC",
  PrimaryKeyDesc = "PRIMARY_KEY_DESC"
}
/** Methods to use when ordering `Venue`. */
export enum VenuesOrderBy {
  Natural = "NATURAL",
  NameAsc = "NAME_ASC",
  NameDesc = "NAME_DESC",
  DescriptionAsc = "DESCRIPTION_ASC",
  DescriptionDesc = "DESCRIPTION_DESC",
  LatAsc = "LAT_ASC",
  LatDesc = "LAT_DESC",
  LonAsc = "LON_ASC",
  LonDesc = "LON_DESC",
  CityAsc = "CITY_ASC",
  CityDesc = "CITY_DESC",
  AddressAsc = "ADDRESS_ASC",
  AddressDesc = "ADDRESS_DESC",
  PhotoAsc = "PHOTO_ASC",
  PhotoDesc = "PHOTO_DESC",
  LogoAsc = "LOGO_ASC",
  LogoDesc = "LOGO_DESC",
  CreatedAtAsc = "CREATED_AT_ASC",
  CreatedAtDesc = "CREATED_AT_DESC",
  UpdatedAtAsc = "UPDATED_AT_ASC",
  UpdatedAtDesc = "UPDATED_AT_DESC",
  PrimaryKeyAsc = "PRIMARY_KEY_ASC",
  PrimaryKeyDesc = "PRIMARY_KEY_DESC"
}
/** Methods to use when ordering `FollowList`. */
export enum FollowListsOrderBy {
  Natural = "NATURAL",
  IdAsc = "ID_ASC",
  IdDesc = "ID_DESC",
  AccountIdAsc = "ACCOUNT_ID_ASC",
  AccountIdDesc = "ACCOUNT_ID_DESC",
  ArtistIdAsc = "ARTIST_ID_ASC",
  ArtistIdDesc = "ARTIST_ID_DESC",
  VenueIdAsc = "VENUE_ID_ASC",
  VenueIdDesc = "VENUE_ID_DESC",
  PrimaryKeyAsc = "PRIMARY_KEY_ASC",
  PrimaryKeyDesc = "PRIMARY_KEY_DESC"
}
/** Methods to use when ordering `GenreToArtist`. */
export enum GenreToArtistsOrderBy {
  Natural = "NATURAL",
  IdAsc = "ID_ASC",
  IdDesc = "ID_DESC",
  GenreIdAsc = "GENRE_ID_ASC",
  GenreIdDesc = "GENRE_ID_DESC",
  ArtistIdAsc = "ARTIST_ID_ASC",
  ArtistIdDesc = "ARTIST_ID_DESC",
  PrimaryKeyAsc = "PRIMARY_KEY_ASC",
  PrimaryKeyDesc = "PRIMARY_KEY_DESC"
}
/** Methods to use when ordering `ArtistToEvent`. */
export enum ArtistToEventsOrderBy {
  Natural = "NATURAL",
  IdAsc = "ID_ASC",
  IdDesc = "ID_DESC",
  ArtistIdAsc = "ARTIST_ID_ASC",
  ArtistIdDesc = "ARTIST_ID_DESC",
  EventIdAsc = "EVENT_ID_ASC",
  EventIdDesc = "EVENT_ID_DESC",
  PrimaryKeyAsc = "PRIMARY_KEY_ASC",
  PrimaryKeyDesc = "PRIMARY_KEY_DESC"
}
/** Methods to use when ordering `WatchList`. */
export enum WatchListsOrderBy {
  Natural = "NATURAL",
  IdAsc = "ID_ASC",
  IdDesc = "ID_DESC",
  AccountIdAsc = "ACCOUNT_ID_ASC",
  AccountIdDesc = "ACCOUNT_ID_DESC",
  EventIdAsc = "EVENT_ID_ASC",
  EventIdDesc = "EVENT_ID_DESC",
  PrimaryKeyAsc = "PRIMARY_KEY_ASC",
  PrimaryKeyDesc = "PRIMARY_KEY_DESC"
}
/** Methods to use when ordering `UserAccount`. */
export enum UserAccountsOrderBy {
  Natural = "NATURAL",
  AccountIdAsc = "ACCOUNT_ID_ASC",
  AccountIdDesc = "ACCOUNT_ID_DESC",
  EmailAsc = "EMAIL_ASC",
  EmailDesc = "EMAIL_DESC",
  PasswordHashAsc = "PASSWORD_HASH_ASC",
  PasswordHashDesc = "PASSWORD_HASH_DESC",
  PrimaryKeyAsc = "PRIMARY_KEY_ASC",
  PrimaryKeyDesc = "PRIMARY_KEY_DESC"
}
/** Methods to use when ordering `AdminAccount`. */
export enum AdminAccountsOrderBy {
  Natural = "NATURAL",
  AccountIdAsc = "ACCOUNT_ID_ASC",
  AccountIdDesc = "ACCOUNT_ID_DESC",
  EmailAsc = "EMAIL_ASC",
  EmailDesc = "EMAIL_DESC",
  PasswordHashAsc = "PASSWORD_HASH_ASC",
  PasswordHashDesc = "PASSWORD_HASH_DESC",
  PrimaryKeyAsc = "PRIMARY_KEY_ASC",
  PrimaryKeyDesc = "PRIMARY_KEY_DESC"
}
/** Methods to use when ordering `Artist`. */
export enum ArtistsOrderBy {
  Natural = "NATURAL",
  NameAsc = "NAME_ASC",
  NameDesc = "NAME_DESC",
  DescriptionAsc = "DESCRIPTION_ASC",
  DescriptionDesc = "DESCRIPTION_DESC",
  PhotoAsc = "PHOTO_ASC",
  PhotoDesc = "PHOTO_DESC",
  TwitterUsernameAsc = "TWITTER_USERNAME_ASC",
  TwitterUsernameDesc = "TWITTER_USERNAME_DESC",
  TwitterUrlAsc = "TWITTER_URL_ASC",
  TwitterUrlDesc = "TWITTER_URL_DESC",
  FacebookUsernameAsc = "FACEBOOK_USERNAME_ASC",
  FacebookUsernameDesc = "FACEBOOK_USERNAME_DESC",
  FacebookUrlAsc = "FACEBOOK_URL_ASC",
  FacebookUrlDesc = "FACEBOOK_URL_DESC",
  InstagramUsernameAsc = "INSTAGRAM_USERNAME_ASC",
  InstagramUsernameDesc = "INSTAGRAM_USERNAME_DESC",
  InstagramUrlAsc = "INSTAGRAM_URL_ASC",
  InstagramUrlDesc = "INSTAGRAM_URL_DESC",
  SoundcloudUsernameAsc = "SOUNDCLOUD_USERNAME_ASC",
  SoundcloudUsernameDesc = "SOUNDCLOUD_USERNAME_DESC",
  SoundcloudUrlAsc = "SOUNDCLOUD_URL_ASC",
  SoundcloudUrlDesc = "SOUNDCLOUD_URL_DESC",
  YoutubeUsernameAsc = "YOUTUBE_USERNAME_ASC",
  YoutubeUsernameDesc = "YOUTUBE_USERNAME_DESC",
  YoutubeUrlAsc = "YOUTUBE_URL_ASC",
  YoutubeUrlDesc = "YOUTUBE_URL_DESC",
  SpotifyUrlAsc = "SPOTIFY_URL_ASC",
  SpotifyUrlDesc = "SPOTIFY_URL_DESC",
  HomepageAsc = "HOMEPAGE_ASC",
  HomepageDesc = "HOMEPAGE_DESC",
  CreatedAtAsc = "CREATED_AT_ASC",
  CreatedAtDesc = "CREATED_AT_DESC",
  UpdatedAtAsc = "UPDATED_AT_ASC",
  UpdatedAtDesc = "UPDATED_AT_DESC",
  PrimaryKeyAsc = "PRIMARY_KEY_ASC",
  PrimaryKeyDesc = "PRIMARY_KEY_DESC"
}
/** Methods to use when ordering `Genre`. */
export enum GenresOrderBy {
  Natural = "NATURAL",
  NameAsc = "NAME_ASC",
  NameDesc = "NAME_DESC",
  DescriptionAsc = "DESCRIPTION_ASC",
  DescriptionDesc = "DESCRIPTION_DESC",
  CreatedAtAsc = "CREATED_AT_ASC",
  CreatedAtDesc = "CREATED_AT_DESC",
  UpdatedAtAsc = "UPDATED_AT_ASC",
  UpdatedAtDesc = "UPDATED_AT_DESC",
  PrimaryKeyAsc = "PRIMARY_KEY_ASC",
  PrimaryKeyDesc = "PRIMARY_KEY_DESC"
}
/** Methods to use when ordering `Region`. */
export enum RegionsOrderBy {
  Natural = "NATURAL",
  NameAsc = "NAME_ASC",
  NameDesc = "NAME_DESC",
  DescriptionAsc = "DESCRIPTION_ASC",
  DescriptionDesc = "DESCRIPTION_DESC",
  PhotoAsc = "PHOTO_ASC",
  PhotoDesc = "PHOTO_DESC",
  CountryAsc = "COUNTRY_ASC",
  CountryDesc = "COUNTRY_DESC",
  CreatedAtAsc = "CREATED_AT_ASC",
  CreatedAtDesc = "CREATED_AT_DESC",
  UpdatedAtAsc = "UPDATED_AT_ASC",
  UpdatedAtDesc = "UPDATED_AT_DESC",
  PrimaryKeyAsc = "PRIMARY_KEY_ASC",
  PrimaryKeyDesc = "PRIMARY_KEY_DESC"
}

/** A location in a connection that can be used for resuming pagination. */
export type Cursor = any;

/** A signed eight-byte integer. The upper big integer values are greater then the max value for a JavaScript number. Therefore all big integers will be output as strings and not numbers. */
export type BigInt = any;

/** A point in time as described by the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone. */
export type Datetime = any;

/** A floating point number that requires more precision than IEEE 754 binary 64 */
export type BigFloat = any;

/** A JSON Web Token defined by [RFC 7519](https://tools.ietf.org/html/rfc7519) which securely represents claims between two parties. */
export type JwtToken = any;

// ====================================================
// Documents
// ====================================================

export namespace AccountByUsername {
  export type Variables = {
    username: string;
    accountId: number;
  };

  export type Query = {
    __typename?: "Query";

    accountByUsername: Maybe<AccountByUsername>;
  };

  export type AccountByUsername = {
    __typename?: "Account";

    username: string;

    profilePhoto: Maybe<string>;

    watchListsByAccountId: WatchListsByAccountId;

    followListsByAccountId: FollowListsByAccountId;
  };

  export type WatchListsByAccountId = {
    __typename?: "WatchListsConnection";

    totalCount: Maybe<number>;

    nodes: (Maybe<Nodes>)[];
  };

  export type Nodes = {
    __typename?: "WatchList";

    eventByEventId: Maybe<EventByEventId>;
  };

  export type EventByEventId = {
    __typename?: "Event";

    id: string;

    name: Maybe<string>;

    startDate: BigInt;

    ticketproviderurl: Maybe<string>;

    ticketproviderid: Maybe<string>;

    venue: string;

    createdAt: Maybe<BigInt>;

    artistToEventsByEventId: ArtistToEventsByEventId;

    watchListsByEventId: WatchListsByEventId;
  };

  export type ArtistToEventsByEventId = {
    __typename?: "ArtistToEventsConnection";

    nodes: (Maybe<_Nodes>)[];
  };

  export type _Nodes = {
    __typename?: "ArtistToEvent";

    artistByArtistId: Maybe<ArtistByArtistId>;
  };

  export type ArtistByArtistId = {
    __typename?: "Artist";

    photo: Maybe<string>;
  };

  export type WatchListsByEventId = {
    __typename?: "WatchListsConnection";

    nodes: (Maybe<__Nodes>)[];
  };

  export type __Nodes = {
    __typename?: "WatchList";

    id: number;
  };

  export type FollowListsByAccountId = {
    __typename?: "FollowListsConnection";

    totalCount: Maybe<number>;

    nodes: (Maybe<___Nodes>)[];
  };

  export type ___Nodes = {
    __typename?: "FollowList";

    id: number;

    artistByArtistId: Maybe<_ArtistByArtistId>;

    venueByVenueId: Maybe<VenueByVenueId>;
  };

  export type _ArtistByArtistId = {
    __typename?: "Artist";

    name: string;

    photo: Maybe<string>;
  };

  export type VenueByVenueId = {
    __typename?: "Venue";

    name: string;

    photo: Maybe<string>;
  };
}

export namespace AllLocations {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    allCities: Maybe<AllCities>;
  };

  export type AllCities = {
    __typename?: "CitiesConnection";

    nodes: (Maybe<Nodes>)[];
  };

  export type Nodes = {
    __typename?: "City";

    id: number;

    name: Maybe<string>;

    region: Maybe<string>;
  };
}

export namespace ArtistByName {
  export type Variables = {
    name: string;
    accountId: number;
  };

  export type Query = {
    __typename?: "Query";

    artistByName: Maybe<ArtistByName>;
  };

  export type ArtistByName = {
    __typename?: "Artist";

    name: string;

    description: Maybe<string>;

    photo: Maybe<string>;

    twitterUsername: Maybe<string>;

    twitterUrl: Maybe<string>;

    facebookUsername: Maybe<string>;

    facebookUrl: Maybe<string>;

    instagramUsername: Maybe<string>;

    instagramUrl: Maybe<string>;

    soundcloudUsername: Maybe<string>;

    soundcloudUrl: Maybe<string>;

    youtubeUsername: Maybe<string>;

    youtubeUrl: Maybe<string>;

    spotifyUrl: Maybe<string>;

    homepage: Maybe<string>;

    followListsByArtistId: FollowListsByArtistId;

    artistToEventsByArtistId: ArtistToEventsByArtistId;
  };

  export type FollowListsByArtistId = {
    __typename?: "FollowListsConnection";

    nodes: (Maybe<Nodes>)[];
  };

  export type Nodes = {
    __typename?: "FollowList";

    id: number;
  };

  export type ArtistToEventsByArtistId = {
    __typename?: "ArtistToEventsConnection";

    nodes: (Maybe<_Nodes>)[];
  };

  export type _Nodes = {
    __typename?: "ArtistToEvent";

    eventByEventId: Maybe<EventByEventId>;
  };

  export type EventByEventId = {
    __typename?: "Event";

    name: Maybe<string>;

    venue: string;

    startDate: BigInt;

    id: string;

    ticketproviderurl: Maybe<string>;

    ticketproviderid: Maybe<string>;

    watchListsByEventId: WatchListsByEventId;
  };

  export type WatchListsByEventId = {
    __typename?: "WatchListsConnection";

    nodes: (Maybe<__Nodes>)[];
  };

  export type __Nodes = {
    __typename?: "WatchList";

    id: number;
  };
}

export namespace AuthenticateUserAccount {
  export type Variables = {
    email: string;
    password: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    authenticateUserAccount: Maybe<AuthenticateUserAccount>;
  };

  export type AuthenticateUserAccount = {
    __typename?: "AuthenticateUserAccountPayload";

    jwtToken: Maybe<JwtToken>;
  };
}

export namespace CreateFollowList {
  export type Variables = {
    accountId: number;
    artistId?: Maybe<string>;
    venueId?: Maybe<string>;
  };

  export type Mutation = {
    __typename?: "Mutation";

    createFollowList: Maybe<CreateFollowList>;
  };

  export type CreateFollowList = {
    __typename?: "CreateFollowListPayload";

    followList: Maybe<FollowList>;
  };

  export type FollowList = {
    __typename?: "FollowList";

    id: number;
  };
}

export namespace CreateWatchList {
  export type Variables = {
    accountId: number;
    eventId: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    createWatchList: Maybe<CreateWatchList>;
  };

  export type CreateWatchList = {
    __typename?: "CreateWatchListPayload";

    watchList: Maybe<WatchList>;
  };

  export type WatchList = {
    __typename?: "WatchList";

    id: number;
  };
}

export namespace CurrentAccount {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    currentAccount: Maybe<CurrentAccount>;
  };

  export type CurrentAccount = {
    __typename?: "Account";

    username: string;

    profilePhoto: Maybe<string>;

    id: number;

    watchListsByAccountId: WatchListsByAccountId;
  };

  export type WatchListsByAccountId = {
    __typename?: "WatchListsConnection";

    totalCount: Maybe<number>;
  };
}

export namespace EventById {
  export type Variables = {
    eventId: string;
  };

  export type Query = {
    __typename?: "Query";

    eventById: Maybe<EventById>;
  };

  export type EventById = {
    __typename?: "Event";

    id: string;

    name: Maybe<string>;

    startDate: BigInt;

    endDate: Maybe<BigInt>;

    ticketproviderurl: Maybe<string>;

    ticketproviderid: Maybe<string>;

    description: Maybe<string>;

    banner: Maybe<string>;

    venueByVenue: Maybe<VenueByVenue>;

    artistToEventsByEventId: ArtistToEventsByEventId;
  };

  export type VenueByVenue = {
    __typename?: "Venue";

    name: string;

    lat: Maybe<BigFloat>;

    lon: Maybe<BigFloat>;

    city: number;

    address: Maybe<string>;
  };

  export type ArtistToEventsByEventId = {
    __typename?: "ArtistToEventsConnection";

    nodes: (Maybe<Nodes>)[];
  };

  export type Nodes = {
    __typename?: "ArtistToEvent";

    artistByArtistId: Maybe<ArtistByArtistId>;
  };

  export type ArtistByArtistId = {
    __typename?: "Artist";

    name: string;
  };
}

export namespace RegisterUserAccount {
  export type Variables = {
    username: string;
    email: string;
    password: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    registerUserAccount: Maybe<RegisterUserAccount>;
  };

  export type RegisterUserAccount = {
    __typename?: "RegisterUserAccountPayload";

    clientMutationId: Maybe<string>;
  };
}

export namespace RemoveFollowlist {
  export type Variables = {
    followListId: number;
  };

  export type Mutation = {
    __typename?: "Mutation";

    deleteFollowListById: Maybe<DeleteFollowListById>;
  };

  export type DeleteFollowListById = {
    __typename?: "DeleteFollowListPayload";

    clientMutationId: Maybe<string>;
  };
}

export namespace RemoveWatchlist {
  export type Variables = {
    watchListId: number;
  };

  export type Mutation = {
    __typename?: "Mutation";

    deleteWatchListById: Maybe<DeleteWatchListById>;
  };

  export type DeleteWatchListById = {
    __typename?: "DeleteWatchListPayload";

    clientMutationId: Maybe<string>;
  };
}

export namespace SearchEvents {
  export type Variables = {
    query: string;
    cityId: number;
    accountId: number;
    greaterThan: BigInt;
    lessThan: BigInt;
    count?: Maybe<number>;
  };

  export type Query = {
    __typename?: "Query";

    searchEvents: SearchEvents;
  };

  export type SearchEvents = {
    __typename?: "EventsConnection";

    nodes: (Maybe<Nodes>)[];
  };

  export type Nodes = {
    __typename?: "Event";

    id: string;

    name: Maybe<string>;

    startDate: BigInt;

    ticketproviderurl: Maybe<string>;

    ticketproviderid: Maybe<string>;

    venue: string;

    createdAt: Maybe<BigInt>;

    venueByVenue: Maybe<VenueByVenue>;

    artistToEventsByEventId: ArtistToEventsByEventId;

    watchListsByEventId: WatchListsByEventId;
  };

  export type VenueByVenue = {
    __typename?: "Venue";

    lat: Maybe<BigFloat>;

    lon: Maybe<BigFloat>;
  };

  export type ArtistToEventsByEventId = {
    __typename?: "ArtistToEventsConnection";

    nodes: (Maybe<_Nodes>)[];
  };

  export type _Nodes = {
    __typename?: "ArtistToEvent";

    artistByArtistId: Maybe<ArtistByArtistId>;
  };

  export type ArtistByArtistId = {
    __typename?: "Artist";

    photo: Maybe<string>;
  };

  export type WatchListsByEventId = {
    __typename?: "WatchListsConnection";

    nodes: (Maybe<__Nodes>)[];
  };

  export type __Nodes = {
    __typename?: "WatchList";

    id: number;
  };
}

export namespace VenueByName {
  export type Variables = {
    name: string;
    accountId: number;
  };

  export type Query = {
    __typename?: "Query";

    venueByName: Maybe<VenueByName>;
  };

  export type VenueByName = {
    __typename?: "Venue";

    name: string;

    description: Maybe<string>;

    lat: Maybe<BigFloat>;

    lon: Maybe<BigFloat>;

    city: number;

    address: Maybe<string>;

    photo: Maybe<string>;

    logo: Maybe<string>;

    followListsByVenueId: FollowListsByVenueId;

    eventsByVenue: EventsByVenue;
  };

  export type FollowListsByVenueId = {
    __typename?: "FollowListsConnection";

    nodes: (Maybe<Nodes>)[];
  };

  export type Nodes = {
    __typename?: "FollowList";

    id: number;
  };

  export type EventsByVenue = {
    __typename?: "EventsConnection";

    nodes: (Maybe<_Nodes>)[];
  };

  export type _Nodes = {
    __typename?: "Event";

    name: Maybe<string>;

    startDate: BigInt;

    ticketproviderurl: Maybe<string>;

    ticketproviderid: Maybe<string>;

    id: string;

    artistToEventsByEventId: ArtistToEventsByEventId;
  };

  export type ArtistToEventsByEventId = {
    __typename?: "ArtistToEventsConnection";

    nodes: (Maybe<__Nodes>)[];
  };

  export type __Nodes = {
    __typename?: "ArtistToEvent";

    artistByArtistId: Maybe<ArtistByArtistId>;
  };

  export type ArtistByArtistId = {
    __typename?: "Artist";

    photo: Maybe<string>;
  };
}
