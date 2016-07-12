"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
// We should be able to access Http services from anywhere in the application. 
// So we register them in the bootstrap call of main.ts where we launch the 
// application and its root AppComponent.
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var app_routes_1 = require('./app.routes');
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
var http_2 = require('@angular/http');
var angular2_in_memory_web_api_1 = require('angular2-in-memory-web-api');
var in_memory_data_service_1 = require('./in-memory-data.service');
/////// END SIMULATING IMPORTS
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    app_routes_1.appRouterProviders,
    http_1.HTTP_PROVIDERS,
    // We're replacing the default XHRBackend, the service that talks to the remote server, with the in-memory web API service
    { provide: http_2.XHRBackend, useClass: angular2_in_memory_web_api_1.InMemoryBackendService },
    { provide: angular2_in_memory_web_api_1.SEED_DATA, useClass: in_memory_data_service_1.InMemoryDataService } // in-mem server data
]);
//# sourceMappingURL=main.js.map