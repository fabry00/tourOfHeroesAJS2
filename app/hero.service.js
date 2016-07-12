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
var http_1 = require('@angular/http');
// Used before simulate HTTP
//import { HEROES } from './mock-heroes';
require('rxjs/add/operator/toPromise');
var HeroService = (function () {
    function HeroService(http) {
        this.http = http;
        this.heroesUrl = 'app/heroes'; // URL to web api
    }
    // Used before simulate HTTP
    /*
    getHeroes() {
      // A Promise is ... well it's a promise to call us back later when the results are ready
      // We're still mocking the data. We're simulating the behavior of an ultra-fast, zero-latency server,
      // by returning an immediately resolved Promise with our mock heroes as the result.
      
      //return Promise.resolve(HEROES);
    }*/
    HeroService.prototype.getHeroes = function () {
        /**
         * We're still returning a Promise but we're creating it differently.
         * The Angular http.get returns an RxJS Observable. Observables are a powerful
         * way to manage asynchronous data flows. We'll learn about Observables later.
         *
         */
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    HeroService.prototype.getHeroesSlowly = function () {
        /*return new Promise<Hero[]>(resolve =>
          setTimeout(() => resolve(HEROES), 2000) // 2 seconds
        );*/
    };
    HeroService.prototype.getHero = function (id) {
        return this.getHeroes()
            .then(function (heroes) { return heroes.find(function (hero) { return hero.id === id; }); });
    };
    HeroService.prototype.delete = function (hero) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.heroesUrl + "/" + hero.id;
        return this.http
            .delete(url, headers)
            .toPromise()
            .catch(this.handleError);
    };
    /**
     * We combine the call to the private post and put methods in a single save method.
     * This simplifies the public API and makes the integration
     * with HeroDetailComponent easier. HeroService determines which method to call based
     * on the state of the hero object. If the hero already has an id we know it's an
     * edit. Otherwise we know it's an add.
     */
    HeroService.prototype.save = function (hero) {
        if (hero.id) {
            return this.put(hero);
        }
        return this.post(hero);
    };
    // Add a New Hero
    HeroService.prototype.post = function (hero) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post(this.heroesUrl, JSON.stringify(hero), { headers: headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    // Modify an hero
    HeroService.prototype.put = function (hero) {
        // Put will be used to update an individual hero. Its structure is very similar to 
        // Post requests. The only difference is that we have to change the url slightly 
        // by appending the id of the hero we want to update.
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.heroesUrl + "/" + hero.id;
        return this.http.put(url, JSON.stringify(hero), { headers: headers })
            .toPromise()
            .then(function () { return hero; })
            .catch(this.handleError);
    };
    HeroService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    HeroService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HeroService);
    return HeroService;
}());
exports.HeroService = HeroService;
//# sourceMappingURL=hero.service.js.map