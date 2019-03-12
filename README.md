# EDM Flare

## Todos
- Mailing setup
    - ~~Working with pomb + ses~~
    - ~~Create welcome email~~
        - ~~Nice image of on different devices~~
        - ~~Explain a bit about community~~
        - Explain how to install as an app
        - ~~Make sure they know it's just updates from here on out~~
- ~~Create watching table + functionality for users for an event. Only for logged in.~~
- ~~Create follow table for artists and venues.~~
- ~~Feed view for new stuff in following~~
    - Need a /following route with grid of events for followed artists / venues a la eb
- ~~Feed view for watched events~~
- ~~on the events page try making the virtual scroll full page width. On browser make the search position absolute, but on mobile it needs to be a set height so we can make the height of the below container correct.~~
- ~~Back btn for mobile~~
- ~~Login / signup flow (for now)~~
    - ~~Own pages with redirect~~
- ~~Add cookie for selected location~~
- ~~Indicator 'new' event~~
- ~~Guards on various routes (settings, login, signup, submit) based on logged in state~~
- Simple submit event page (after release)
    - Would need some nice autofill boxes on front end to check event doesn't already exist + form requirements
- ~~Polish up artist + event page. Need some fall back banners that don't look like ass. EB if there is one for shows~~
- ~~SEO work with titles for pages~~
- ~~Create + add logo~~
- ~~Make location search work for cities and regions~~
- Fix footer
    - ~~Styling mobile~~
    - ~~Maybe some nice links to popular regions~~
        - ~~Would be nice to have a page with all countries, regions, cities like https://www.eventbrite.com/directory/sitemap/~~
    - ~~Fix / create social links~~
    - About page
    - ~~Contact Page~~
    - Terms / privacy

- Create Event Page
    - 
- Home page
  - ~~Search box in header with location / date~~
  - ~~Featured shows below for NY on default and then maybe a cookie for recent search location pulls from there~~
    - ~~Featured shows~~
        - Would like to lift results like eventbrite or ticket fly which return the most $$$. Wait to figure out what the returns are. Would do this by adding a filter type = eventbrite or whatnot on the graphql call
    - ~~Maybe a nice little display of features like discuss shows with others, save for future, etc~~
- Search results page
  - ~~Can share show~~
  - ~~Can favorite show (prompt to signin if not)~~
  - ~~Can buy ticket if eventbrite~~
  - ~~Can follow link to show page~~
  - ~~Can filter by date~~
    - No range yet, but maybe in 8.0? https://github.com/angular/material2/issues/4763#issuecomment-458650255
  - ~~Can search for word (artist, venue)~~
  - List and map view
  - ~~Implement event brite widget for buying tickets~~
    - There is a cross origin deal since localhost isn't https. Breaks the methods (like close modal). Once it's live online it should be okay. Need an affiliate link of our own and to put a few things in the env vars
- Show page
  - ~~Can buy ticket~~
  - ~~Grab eventbrite banner images~~
  - ~~General info about show~~
  - ~~Map where it's at~~
  - ~~Links to artist page and venue page~~
  - ~~Disqus comments for people to ask things~~
- Artist page
  - ~~Display their shows~~
  - ~~Soundcloud plugin~~
- Venue page
  - General info
  - ~~Upcoming events~~
  - ~~photo~~
  - ~~map~~
- Setup google analytics
    - ~~For pages~~
    - For on some clicks (like buy tickets)
    - ~~Need to swap in correct account in index.html~~
- Settings page
    - User setting to change frequency of email updates
        - Also what cities to watch. In settings
        - Going to need a table for this - probably identify region vs city I guesss
        - Something in footer with link to get notifications that pops alert to sign in if not
    - Unsubscribe
    - Change profile pic (down the line)
    - Delete account
    - ~~password stuff~~

## Feature Ideas
- List view for a region on a per day basis
- Email alerts on a weekly / semi weekly / monthly basis
- Filter by genre, venue, region, artist
- Follow feature. Would be adding a table for adding artists or venues and linking with a user. Can have a chronological feed of followed items with new things and maybe notification / email updates every some period of time.
- A page with new releases for the week that might pull from reddit playlist

## Design
- Device mocks https://mockuphone.com/#ios
- Email Templates - mailchimp


## Monetization
- Lifted results for venues who want to promote something
- Affiliate links for eventbrite, ticketfly, ticketmaster, seetickets, etix, etc (Ticketfly is $.25 per purchase)
- Affiliate links to albums on amazon or something
- Affiliate links for accomodation https://www.stay22.com/

## Down the line
- Map view the world over. Would be for a certain date and a user can modify the date to refresh map
- PWA available with push notifications for followed artists or venues.
    - https://blog.angular-university.io/angular-push-notifications/
    - https://github.com/web-push-libs/web-push
- Featured / hot / lifted events up top
- Maybe pull api stuff for artists from youtube / insta / etc if they have it
- Skeleton loading
    - https://blog.angularindepth.com/https-medium-com-thomasburleson-animated-ghosts-bfc045a51fba
- App store apps
    - https://www.nativescript.org/nativescript-is-how-you-build-native-mobile-apps-with-angular/code-sharing-angular-and-nativescript
    - https://blog.angular.io/apps-that-work-natively-on-the-web-and-mobile-9b26852495e7

### Name Ideas


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

- Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
- To run a staging build: `ng build --configuration=staging`
    - Staging setup env config https://angular.io/guide/build

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

## Logo Work
- Great intro video logo for inkscape (inspo for logo here): https://www.youtube.com/watch?v=hmaYeZ5iDPo
- Inkscape (svg) / gimp (for maing transparent png)
- Nice favicon generator https://realfavicongenerator.net/
- App logo generator https://makeappicon.com/

### Export svg from Inkscape
- Select the object(s) to export
- Open the document properties window (Ctrl+Shift+D)
- Select "Resize page to drawing or selection"
- File > Save As Copy...
- Select Optimized SVG as the format if you want to use it on the web