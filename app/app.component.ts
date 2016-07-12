import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HeroService }     from './hero.service';
@Component({
  selector: 'my-app',
  styleUrls: ['app/app.component.css'],
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['/dashboard']" routerLinkActive="active">Dashboard</a>
      <a [routerLink]="['/heroes']" routerLinkActive="active">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `,  
  //The Angular Router provides a routerLinkActive directive we can use to to add a class to the HTML navigation element whose route matches the active route. All we have to do is define the style for it. Sweet!
  directives: [ROUTER_DIRECTIVES],
  providers: [
    /**
     * We'd like to re-use the HeroService to populate the component's heroes array.
     * Recall earlier in the chapter that we removed the HeroService from the providers array of the HeroesComponent and added it to the providers array of the top level AppComponent.
     * That move created a singleton HeroService instance, available to all components of the application. Angular will inject HeroService and we'll use it here in the DashboardComponent.
     */
    HeroService
  ]
})
export class AppComponent {
  title = 'Tour of Heroes';
}
