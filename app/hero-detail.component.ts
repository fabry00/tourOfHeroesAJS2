import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from './hero.service';
import { Hero } from './hero';

@Component({
        selector: 'my-hero-detail',
        templateUrl: 'app/hero-detail.component.html',
        styleUrls : ['app/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit, OnDestroy {
        hero: Hero;
        sub: any;

        constructor(
                private heroService: HeroService,
                private route: ActivatedRoute
        ) { }

        ngOnInit() {
                // Inside the ngOnInit lifecycle hook, we subscribe to the params 
                // observable to extract the id parameter value from the ActivateRoute
                //  service and use the HeroService to fetch the hero with that id.
                this.sub = this.route.params.subscribe(params => {
                        // The hero id is a number. Route parameters are always 
                        // strings. So we convert the route parameter value to a
                        // number with the JavaScript (+) operator.
                        let id = +params['id'];
                        this.heroService.getHero(id)
                                .then(hero => this.hero = hero);
                });
        }

        ngOnDestroy() {
                // Inside the ngOnDestroy lifecycle hook, we unsubscribe from the params subscription.
                this.sub.unsubscribe();
        }

        goBack() {
                // Going back too far could take us out of the application. 
                // That's acceptable in a demo. We'd guard against it in a real application, 
                // perhaps with the CanDeactivate guard. (https://angular.io/docs/ts/latest/api/router/index/CanDeactivate-interface.html)
                window.history.back();
        }
}

