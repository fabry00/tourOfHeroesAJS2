import { bootstrap }    from '@angular/platform-browser-dynamic';
// We should be able to access Http services from anywhere in the application. 
// So we register them in the bootstrap call of main.ts where we launch the 
// application and its root AppComponent.
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent } from './app.component';
import { appRouterProviders } from './app.routes';



/**
 * Simulating the web API 
 * We generally recommend registering application-wide services in the root AppComponent
 * providers. 
 * Here we're registering in main for a special reason.
 * Our application is in the early stages of development and far from ready for 
 * production. We don't even have a web server that can handle requests for heroes. 
 * Until we do, we'll have to fake it.
 * We're going to trick the HTTP client into fetching and saving data from a mock 
 * service, the in-memory web API.
 * The application itself doesn't need to know and shouldn't know about this. 
 * So we'll slip the in-memory web API into the configuration above the AppComponent.
 */
// Imports for loading & configuring the in-memory web api
import { XHRBackend } from '@angular/http';
import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
import { InMemoryDataService }               from './in-memory-data.service';
/////// END SIMULATING IMPORTS

bootstrap(AppComponent, [
  appRouterProviders,
  HTTP_PROVIDERS,
  // We're replacing the default XHRBackend, the service that talks to the remote server, with the in-memory web API service
  { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
  { provide: SEED_DATA, useClass: InMemoryDataService }      // in-mem server data
]);
