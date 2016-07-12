import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from './hero.service';
import { Hero } from './hero';

@Component({
        selector: 'my-hero-detail',
        templateUrl: 'app/hero-detail.component.html',
        styleUrls: ['app/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit, OnDestroy {
        @Input() hero: Hero;
        @Output() close = new EventEmitter();
        error: any;
        sub: any;
        navigated = false; // true if navigated here

        constructor(
                private heroService: HeroService,
                private route: ActivatedRoute
        ) { }

        ngOnInit() {
                // Inside the ngOnInit lifecycle hook, we subscribe to the params 
                // observable to extract the id parameter value from the ActivateRoute
                //  service and use the HeroService to fetch the hero with that id.
                this.sub = this.route.params.subscribe(params => {
                        if (params['id'] !== undefined) {
                                // The hero id is a number. Route parameters are always 
                                // strings. So we convert the route parameter value to a
                                // number with the JavaScript (+) operator.
                                let id = +params['id'];
                                this.navigated = true;
                                this.heroService.getHero(id)
                                        .then(hero => this.hero = hero);
                        } else {
                                this.navigated = false;
                                this.hero = new Hero();
                        }
                });
        }

        ngOnDestroy() {
                // Inside the ngOnDestroy lifecycle hook, we unsubscribe from the params subscription.
                this.sub.unsubscribe();
        }

        save() {
                this.heroService
                        .save(this.hero)
                        .then(hero => {
                                this.hero = hero; // saved hero, w/ id if new
                                this.goBack(hero);
                        })
                        .catch(error => this.error = error); // TODO: Display error message
        }

        goBack(savedHero: Hero = null) {
                // Going back too far could take us out of the application. 
                // That's acceptable in a demo. We'd guard against it in a real application, 
                // perhaps with the CanDeactivate guard. (https://angular.io/docs/ts/latest/api/router/index/CanDeactivate-interface.html)

                // Here we call emit to notify that we just added or modified a hero. 
                // HeroesComponent is listening for this notification and will automatically
                // refresh the list of heroes to include our recent updates.
                this.close.emit(savedHero);
                if (this.navigated) { window.history.back(); }
        }
}

