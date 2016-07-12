"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var hero_service_1 = require('./hero.service');
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Tour of Heroes';
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            styleUrls: ['app/app.component.css'],
            template: "\n    <h1>{{title}}</h1>\n    <nav>\n      <a [routerLink]=\"['/dashboard']\" routerLinkActive=\"active\">Dashboard</a>\n      <a [routerLink]=\"['/heroes']\" routerLinkActive=\"active\">Heroes</a>\n    </nav>\n    <router-outlet></router-outlet>\n  ",
            //The Angular Router provides a routerLinkActive directive we can use to to add a class to the HTML navigation element whose route matches the active route. All we have to do is define the style for it. Sweet!
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [
                /**
                 * We'd like to re-use the HeroService to populate the component's heroes array.
                 * Recall earlier in the chapter that we removed the HeroService from the providers array of the HeroesComponent and added it to the providers array of the top level AppComponent.
                 * That move created a singleton HeroService instance, available to all components of the application. Angular will inject HeroService and we'll use it here in the DashboardComponent.
                 */
                hero_service_1.HeroService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map