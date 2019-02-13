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
    query artistByName($name: String!) {
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
        artistToEventsByArtistId {
          nodes {
            eventByEventId {
              name
              venue
              startDate
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
        description
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
export class EventsByCityGQL extends Apollo.Query<
  EventsByCity.Query,
  EventsByCity.Variables
> {
  document: any = gql`
    query eventsByCity($city: String!) {
      allCities(filter: { name: { equalTo: $city } }) {
        nodes {
          name
          venuesByCity {
            nodes {
              name
              eventsByVenue {
                nodes {
                  id
                  name
                  startDate
                  ticketproviderurl
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
export class VenueByNameGQL extends Apollo.Query<
  VenueByName.Query,
  VenueByName.Variables
> {
  document: any = gql`
    query venueByName($name: String!) {
      venueByName(name: $name) {
        name
        description
        lat
        lon
        city
        address
        photo
        logo
        eventsByVenue {
          nodes {
            name
            startDate
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
  /** Checks for equality with the object’s `userLocation` field. */
  userLocation?: Maybe<string>;
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
  /** Filter by the object’s `userLocation` field. */
  userLocation?: Maybe<StringFilter>;
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
/** A condition to be used against `Config` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export interface ConfigCondition {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<number>;
  /** Checks for equality with the object’s `primaryColor` field. */
  primaryColor?: Maybe<string>;
  /** Checks for equality with the object’s `secondaryColor` field. */
  secondaryColor?: Maybe<string>;
  /** Checks for equality with the object’s `tagline` field. */
  tagline?: Maybe<string>;
  /** Checks for equality with the object’s `heroBanner` field. */
  heroBanner?: Maybe<string>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Datetime>;
}
/** A filter to be used against `Config` object types. All fields are combined with a logical ‘and.’ */
export interface ConfigFilter {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `primaryColor` field. */
  primaryColor?: Maybe<StringFilter>;
  /** Filter by the object’s `secondaryColor` field. */
  secondaryColor?: Maybe<StringFilter>;
  /** Filter by the object’s `tagline` field. */
  tagline?: Maybe<StringFilter>;
  /** Filter by the object’s `heroBanner` field. */
  heroBanner?: Maybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<ConfigFilter[]>;
  /** Checks for any expressions in this list. */
  or?: Maybe<ConfigFilter[]>;
  /** Negates the expression. */
  not?: Maybe<ConfigFilter>;
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
/** A condition to be used against `LoggedAction` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export interface LoggedActionCondition {
  /** Checks for equality with the object’s `eventId` field. */
  eventId?: Maybe<BigInt>;
  /** Checks for equality with the object’s `tableName` field. */
  tableName?: Maybe<string>;
  /** Checks for equality with the object’s `accountId` field. */
  accountId?: Maybe<number>;
  /** Checks for equality with the object’s `sessionUserName` field. */
  sessionUserName?: Maybe<string>;
  /** Checks for equality with the object’s `actionTstampTx` field. */
  actionTstampTx?: Maybe<Datetime>;
  /** Checks for equality with the object’s `clientAddr` field. */
  clientAddr?: Maybe<InternetAddress>;
  /** Checks for equality with the object’s `action` field. */
  action?: Maybe<string>;
  /** Checks for equality with the object’s `rowData` field. */
  rowData?: Maybe<KeyValueHash>;
  /** Checks for equality with the object’s `changedFields` field. */
  changedFields?: Maybe<KeyValueHash>;
}
/** A filter to be used against `LoggedAction` object types. All fields are combined with a logical ‘and.’ */
export interface LoggedActionFilter {
  /** Filter by the object’s `eventId` field. */
  eventId?: Maybe<BigIntFilter>;
  /** Filter by the object’s `tableName` field. */
  tableName?: Maybe<StringFilter>;
  /** Filter by the object’s `accountId` field. */
  accountId?: Maybe<IntFilter>;
  /** Filter by the object’s `sessionUserName` field. */
  sessionUserName?: Maybe<StringFilter>;
  /** Filter by the object’s `actionTstampTx` field. */
  actionTstampTx?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `clientAddr` field. */
  clientAddr?: Maybe<InternetAddressFilter>;
  /** Filter by the object’s `action` field. */
  action?: Maybe<StringFilter>;
  /** Filter by the object’s `rowData` field. */
  rowData?: Maybe<KeyValueHashFilter>;
  /** Filter by the object’s `changedFields` field. */
  changedFields?: Maybe<KeyValueHashFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<LoggedActionFilter[]>;
  /** Checks for any expressions in this list. */
  or?: Maybe<LoggedActionFilter[]>;
  /** Negates the expression. */
  not?: Maybe<LoggedActionFilter>;
}
/** A filter to be used against InternetAddress fields. All fields are combined with a logical ‘and.’ */
export interface InternetAddressFilter {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<boolean>;
  /** Equal to the specified value. */
  equalTo?: Maybe<InternetAddress>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<InternetAddress>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<InternetAddress>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<InternetAddress>;
  /** Included in the specified list. */
  in?: Maybe<InternetAddress[]>;
  /** Not included in the specified list. */
  notIn?: Maybe<InternetAddress[]>;
  /** Contained by the specified internet address. */
  containedBy?: Maybe<InternetAddress>;
  /** Contained by or equal to the specified internet address. */
  containedByOrEqualTo?: Maybe<InternetAddress>;
  /** Contains the specified internet address. */
  contains?: Maybe<InternetAddress>;
  /** Contains or equal to the specified internet address. */
  containsOrEqualTo?: Maybe<InternetAddress>;
  /** Contains or contained by the specified internet address. */
  containsOrContainedBy?: Maybe<InternetAddress>;
}
/** A filter to be used against KeyValueHash fields. All fields are combined with a logical ‘and.’ */
export interface KeyValueHashFilter {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<boolean>;
  /** Equal to the specified value. */
  equalTo?: Maybe<KeyValueHash>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<KeyValueHash>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<KeyValueHash>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<KeyValueHash>;
  /** Included in the specified list. */
  in?: Maybe<KeyValueHash[]>;
  /** Not included in the specified list. */
  notIn?: Maybe<KeyValueHash[]>;
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
  /** Location of user */
  userLocation?: Maybe<string>;
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
/** All input for the create `Config` mutation. */
export interface CreateConfigInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The `Config` to be created by this mutation. */
  config: ConfigInput;
}
/** An input for mutations affecting `Config` */
export interface ConfigInput {
  id?: Maybe<number>;

  primaryColor: string;

  secondaryColor: string;

  tagline: string;

  heroBanner: string;

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
  /** When event created */
  createdAt?: Maybe<BigInt>;
  /** When event last updated */
  updatedAt?: Maybe<Datetime>;
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
/** All input for the create `LoggedAction` mutation. */
export interface CreateLoggedActionInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The `LoggedAction` to be created by this mutation. */
  loggedAction: LoggedActionInput;
}
/** An input for mutations affecting `LoggedAction` */
export interface LoggedActionInput {
  /** Unique identifier for each auditable event */
  eventId?: Maybe<BigInt>;
  /** Non-schema-qualified table name of table event occured in */
  tableName: string;
  /** User performing the action */
  accountId?: Maybe<number>;
  /** Login / session user whose statement caused the audited event */
  sessionUserName?: Maybe<string>;
  /** Transaction start timestamp for tx in which audited event occurred */
  actionTstampTx: Datetime;
  /** IP address of client that issued query. Null for unix domain socket. */
  clientAddr?: Maybe<InternetAddress>;
  /** Action type; I = insert, D = delete, U = update, T = truncate */
  action: string;
  /** Record value. Null for statement-level trigger. For INSERT this is the new tuple. For DELETE and UPDATE it is the old tuple. */
  rowData?: Maybe<KeyValueHash>;
  /** New values of fields changed by UPDATE. Null except for row-level UPDATE events. */
  changedFields?: Maybe<KeyValueHash>;
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
  /** Location of user */
  userLocation?: Maybe<string>;
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
/** All input for the `updateConfig` mutation. */
export interface UpdateConfigInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The globally unique `ID` which will identify a single `Config` to be updated. */
  nodeId: string;
  /** An object where the defined keys will be set on the `Config` being updated. */
  configPatch: ConfigPatch;
}
/** Represents an update to a `Config`. Fields that are set will be updated. */
export interface ConfigPatch {
  id?: Maybe<number>;

  primaryColor?: Maybe<string>;

  secondaryColor?: Maybe<string>;

  tagline?: Maybe<string>;

  heroBanner?: Maybe<string>;

  updatedAt?: Maybe<Datetime>;
}
/** All input for the `updateConfigById` mutation. */
export interface UpdateConfigByIdInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** An object where the defined keys will be set on the `Config` being updated. */
  configPatch: ConfigPatch;

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
/** All input for the `updateLoggedAction` mutation. */
export interface UpdateLoggedActionInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The globally unique `ID` which will identify a single `LoggedAction` to be updated. */
  nodeId: string;
  /** An object where the defined keys will be set on the `LoggedAction` being updated. */
  loggedActionPatch: LoggedActionPatch;
}
/** Represents an update to a `LoggedAction`. Fields that are set will be updated. */
export interface LoggedActionPatch {
  /** Unique identifier for each auditable event */
  eventId?: Maybe<BigInt>;
  /** Non-schema-qualified table name of table event occured in */
  tableName?: Maybe<string>;
  /** User performing the action */
  accountId?: Maybe<number>;
  /** Login / session user whose statement caused the audited event */
  sessionUserName?: Maybe<string>;
  /** Transaction start timestamp for tx in which audited event occurred */
  actionTstampTx?: Maybe<Datetime>;
  /** IP address of client that issued query. Null for unix domain socket. */
  clientAddr?: Maybe<InternetAddress>;
  /** Action type; I = insert, D = delete, U = update, T = truncate */
  action?: Maybe<string>;
  /** Record value. Null for statement-level trigger. For INSERT this is the new tuple. For DELETE and UPDATE it is the old tuple. */
  rowData?: Maybe<KeyValueHash>;
  /** New values of fields changed by UPDATE. Null except for row-level UPDATE events. */
  changedFields?: Maybe<KeyValueHash>;
}
/** All input for the `updateLoggedActionByEventId` mutation. */
export interface UpdateLoggedActionByEventIdInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** An object where the defined keys will be set on the `LoggedAction` being updated. */
  loggedActionPatch: LoggedActionPatch;
  /** Unique identifier for each auditable event */
  eventId: BigInt;
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
/** All input for the `deleteConfig` mutation. */
export interface DeleteConfigInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The globally unique `ID` which will identify a single `Config` to be deleted. */
  nodeId: string;
}
/** All input for the `deleteConfigById` mutation. */
export interface DeleteConfigByIdInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;

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
/** All input for the `deleteLoggedAction` mutation. */
export interface DeleteLoggedActionInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The globally unique `ID` which will identify a single `LoggedAction` to be deleted. */
  nodeId: string;
}
/** All input for the `deleteLoggedActionByEventId` mutation. */
export interface DeleteLoggedActionByEventIdInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** Unique identifier for each auditable event */
  eventId: BigInt;
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
  UserLocationAsc = "USER_LOCATION_ASC",
  UserLocationDesc = "USER_LOCATION_DESC",
  CreatedAtAsc = "CREATED_AT_ASC",
  CreatedAtDesc = "CREATED_AT_DESC",
  UpdatedAtAsc = "UPDATED_AT_ASC",
  UpdatedAtDesc = "UPDATED_AT_DESC",
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

export enum EventType {
  Eventbrite = "EVENTBRITE",
  Ticketfly = "TICKETFLY",
  Ticketmaster = "TICKETMASTER",
  Seetickets = "SEETICKETS",
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
  CreatedAtAsc = "CREATED_AT_ASC",
  CreatedAtDesc = "CREATED_AT_DESC",
  UpdatedAtAsc = "UPDATED_AT_ASC",
  UpdatedAtDesc = "UPDATED_AT_DESC",
  PrimaryKeyAsc = "PRIMARY_KEY_ASC",
  PrimaryKeyDesc = "PRIMARY_KEY_DESC"
}
/** Methods to use when ordering `Config`. */
export enum ConfigsOrderBy {
  Natural = "NATURAL",
  IdAsc = "ID_ASC",
  IdDesc = "ID_DESC",
  PrimaryColorAsc = "PRIMARY_COLOR_ASC",
  PrimaryColorDesc = "PRIMARY_COLOR_DESC",
  SecondaryColorAsc = "SECONDARY_COLOR_ASC",
  SecondaryColorDesc = "SECONDARY_COLOR_DESC",
  TaglineAsc = "TAGLINE_ASC",
  TaglineDesc = "TAGLINE_DESC",
  HeroBannerAsc = "HERO_BANNER_ASC",
  HeroBannerDesc = "HERO_BANNER_DESC",
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
/** Methods to use when ordering `LoggedAction`. */
export enum LoggedActionsOrderBy {
  Natural = "NATURAL",
  EventIdAsc = "EVENT_ID_ASC",
  EventIdDesc = "EVENT_ID_DESC",
  TableNameAsc = "TABLE_NAME_ASC",
  TableNameDesc = "TABLE_NAME_DESC",
  AccountIdAsc = "ACCOUNT_ID_ASC",
  AccountIdDesc = "ACCOUNT_ID_DESC",
  SessionUserNameAsc = "SESSION_USER_NAME_ASC",
  SessionUserNameDesc = "SESSION_USER_NAME_DESC",
  ActionTstampTxAsc = "ACTION_TSTAMP_TX_ASC",
  ActionTstampTxDesc = "ACTION_TSTAMP_TX_DESC",
  ClientAddrAsc = "CLIENT_ADDR_ASC",
  ClientAddrDesc = "CLIENT_ADDR_DESC",
  ActionAsc = "ACTION_ASC",
  ActionDesc = "ACTION_DESC",
  RowDataAsc = "ROW_DATA_ASC",
  RowDataDesc = "ROW_DATA_DESC",
  ChangedFieldsAsc = "CHANGED_FIELDS_ASC",
  ChangedFieldsDesc = "CHANGED_FIELDS_DESC",
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

/** An IPv4 or IPv6 host address, and optionally its subnet. */
export type InternetAddress = any;

/** A set of key/value pairs, keys are strings, values may be a string or null. Exposed as a JSON object. */
export type KeyValueHash = any;

/** A JSON Web Token defined by [RFC 7519](https://tools.ietf.org/html/rfc7519) which securely represents claims between two parties. */
export type JwtToken = any;

// ====================================================
// Documents
// ====================================================

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

    artistToEventsByArtistId: ArtistToEventsByArtistId;
  };

  export type ArtistToEventsByArtistId = {
    __typename?: "ArtistToEventsConnection";

    nodes: (Maybe<Nodes>)[];
  };

  export type Nodes = {
    __typename?: "ArtistToEvent";

    eventByEventId: Maybe<EventByEventId>;
  };

  export type EventByEventId = {
    __typename?: "Event";

    name: Maybe<string>;

    venue: string;

    startDate: BigInt;
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

    description: Maybe<string>;

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

export namespace EventsByCity {
  export type Variables = {
    city: string;
  };

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

    name: Maybe<string>;

    venuesByCity: VenuesByCity;
  };

  export type VenuesByCity = {
    __typename?: "VenuesConnection";

    nodes: (Maybe<_Nodes>)[];
  };

  export type _Nodes = {
    __typename?: "Venue";

    name: string;

    eventsByVenue: EventsByVenue;
  };

  export type EventsByVenue = {
    __typename?: "EventsConnection";

    nodes: (Maybe<__Nodes>)[];
  };

  export type __Nodes = {
    __typename?: "Event";

    id: string;

    name: Maybe<string>;

    startDate: BigInt;

    ticketproviderurl: Maybe<string>;
  };
}

export namespace VenueByName {
  export type Variables = {
    name: string;
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

    eventsByVenue: EventsByVenue;
  };

  export type EventsByVenue = {
    __typename?: "EventsConnection";

    nodes: (Maybe<Nodes>)[];
  };

  export type Nodes = {
    __typename?: "Event";

    name: Maybe<string>;

    startDate: BigInt;
  };
}
