# EDM

## Todos

## Feature Ideas
- Map view the world over. Would be for a certain date and a user can modify the date to refresh map
- List view for a region on a per day basis
- PWA available with push notifications for followed artists or venues.
- Email alerts on a weekly / semi weekly / monthly basis
- Featured / hot / lifted events up top
- Filter by genre, venue, region, artist
- Tour information for artists + bios and shit. Maybe can scrape from spotify or wikipedia or something.

## Monetization
- Lifted results for venues who want to promote something
- Affiliate links for eventbrite, ticketfly, ticketmaster, seetickets, etix, etc (Ticketfly is $.25 per purchase)
- Affiliate links to albums on amazon or something
- Affiliate links for accomodation https://www.stay22.com/

### Name Ideas


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Updating Production

- Web app uses a service worked so we need to break the cache when we update. Change the cache version in service-worker.js to do this and prompt users to do the same.
- Run `$ ng build --prod` to run an AoT build
- Use SFTP (cyber duck) to replace the www folder in /var/www/decorasaurus.com/html on the server

#### Analytics

- Wire in Google analytics for page views
- Wire in analytics for events

## Graphql / Apollo

### Code Generation

#### Run
`$ npm run generate`

#### Setup
- Make sure both graphql-code-generator and graphql are installed globally for this to work.
- Can run `$ gql-gen init` to get it working which will install some things and setup an npm script and codegen.yml file
- Create schemas in the src/app/graphql folder for each and the script will pull from there and generate code in src/app/generated/graphql.ts

