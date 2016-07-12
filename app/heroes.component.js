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
var hero_detail_component_1 = require('./hero-detail.component');
var HeroesComponent = (function () {
    function HeroesComponent(router, heroService) {
        this.router = router;
        this.heroService = heroService;
        this.title = 'Tour of Heroes';
        this.addingHero = false;
        /*
          AppComponent should fetch and display heroes without a fuss. Where do we call the getHeroes method? In a constructor? We do not!
          Years of experience and bitter tears have taught us to keep complex logic out of the constructor, especially anything that might
          call a server as a data access method is sure to do.
          The constructor is for simple initializations like wiring constructor parameters to properties. It's not for heavy lifting.
          We should be able to create a component in a test and not worry that it might do real work  like calling a server!  before we tell it to do so.
    
          Angular will call it if we implement the Angular ngOnInit Lifecycle Hook
        */
    }
    HeroesComponent.prototype.ngOnInit = function () {
        // We write an ngOnInit method with our initialization logic inside and leave it to Angular to call it at the right time. In our case, we initialize by calling getHeroes.
        this.getHeroes();
    };
    HeroesComponent.prototype.onSelect = function (hero) {
        this.selectedHero = hero;
    };
    HeroesComponent.prototype.getHeroes = function () {
        // We pass our callback function as an argument to the Promise's then method:
        // The ES2015 arrow function : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
        // Arrow function compare example: 
        // var a2 = a.map(function(s){ return s.length });
        // var a3 = a.map( s => s.length );
        var _this = this;
        // Our callback sets the component's heroes property to the array of heroes returned by the service. That's all there is to it!
        this.heroService.getHeroes().then(function (heroes) { return _this.heroes = heroes; });
    };
    HeroesComponent.prototype.gotoDetail = function () {
        var link = ['/detail', this.selectedHero.id];
        this.router.navigate(link);
    };
    HeroesComponent.prototype.addHero = function () {
        this.addingHero = true;
        this.selectedHero = null;
    };
    HeroesComponent.prototype.close = function (savedHero) {
        this.addingHero = false;
        if (savedHero) {
            this.getHeroes();
        }
    };
    HeroesComponent.prototype.deleteHero = function (hero, event) {
        var _this = this;
        /**
         * Of course we delegate the persistence of hero deletion to the HeroService.
         * But the component is still responsible for updating the display.
         * So the delete method removes the deleted hero from the list.
         */
        event.stopPropagation();
        this.heroService
            .delete(hero)
            .then(function (res) {
            _this.heroes = _this.heroes.filter(function (h) { return h !== hero; });
            if (_this.selectedHero === hero) {
                _this.selectedHero = null;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    HeroesComponent = __decorate([
        core_1.Component({
            selector: 'my-heroes',
            styleUrls: ['app/heroes.component.css'],
            directives: [hero_detail_component_1.HeroDetailComponent],
            templateUrl: 'app/heroes.component.html',
            providers: []
        }), 
        __metadata('design:paramtypes', [router_1.Router, hero_service_1.HeroService])
    ], HeroesComponent);
    return HeroesComponent;
}());
exports.HeroesComponent = HeroesComponent;
//# sourceMappingURL=heroes.component.js.map