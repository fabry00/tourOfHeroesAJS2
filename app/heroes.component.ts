import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from './hero';
import { HeroService } from './hero.service';

import { HeroDetailComponent } from './hero-detail.component';

@Component({
  selector: 'my-heroes',
  styleUrls: ['app/heroes.component.css'],
  directives: [HeroDetailComponent],
  templateUrl: 'app/heroes.component.html',
  providers: []
})

export class HeroesComponent implements OnInit {
  public heroes: Hero[];

  title = 'Tour of Heroes';
  selectedHero: Hero;
  error: any;
  addingHero = false;

  constructor(
    private router: Router,
    private heroService: HeroService) {
    /*
      AppComponent should fetch and display heroes without a fuss. Where do we call the getHeroes method? In a constructor? We do not!
      Years of experience and bitter tears have taught us to keep complex logic out of the constructor, especially anything that might 
      call a server as a data access method is sure to do.
      The constructor is for simple initializations like wiring constructor parameters to properties. It's not for heavy lifting. 
      We should be able to create a component in a test and not worry that it might do real work  like calling a server!  before we tell it to do so.

      Angular will call it if we implement the Angular ngOnInit Lifecycle Hook
    */
  }

  ngOnInit() {
    // We write an ngOnInit method with our initialization logic inside and leave it to Angular to call it at the right time. In our case, we initialize by calling getHeroes.
    this.getHeroes();
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  getHeroes() {
    // We pass our callback function as an argument to the Promise's then method:
    // The ES2015 arrow function : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
    // Arrow function compare example: 
    // var a2 = a.map(function(s){ return s.length });
    // var a3 = a.map( s => s.length );

    // Our callback sets the component's heroes property to the array of heroes returned by the service. That's all there is to it!
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  gotoDetail() {
    let link = ['/detail', this.selectedHero.id];
    this.router.navigate(link);
  }

  addHero() {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close(savedHero: Hero) {
    this.addingHero = false;
    if (savedHero) { this.getHeroes(); }
  }

  deleteHero(hero: Hero, event: any) {
    /**
     * Of course we delegate the persistence of hero deletion to the HeroService. 
     * But the component is still responsible for updating the display. 
     * So the delete method removes the deleted hero from the list.
     */
    event.stopPropagation();
    this.heroService
      .delete(hero)
      .then(res => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      })
      .catch(error => this.error = error);
  }
}

