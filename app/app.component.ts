import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { HeroDetailComponent } from './hero-detail.component';



@Component({
  selector: 'my-app',
  styles: [`
          .selected {
            background-color: #CFD8DC !important;
            color: white;
          }
          .heroes {
            margin: 0 0 2em 0;
            list-style-type: none;
            padding: 0;
            width: 15em;
          }
          .heroes li {
            cursor: pointer;
            position: relative;
            left: 0;
            background-color: #EEE;
            margin: .5em;
            padding: .3em 0;
            height: 1.6em;
            border-radius: 4px;
          }
          .heroes li.selected:hover {
            background-color: #BBD8DC !important;
            color: white;
          }
          .heroes li:hover {
            color: #607D8B;
            background-color: #DDD;
            left: .1em;
          }
          .heroes .text {
            position: relative;
            top: -3px;
          }
          .heroes .badge {
            display: inline-block;
            font-size: small;
            color: white;
            padding: 0.8em 0.7em 0 0.7em;
            background-color: #607D8B;
            line-height: 1em;
            position: relative;
            left: -1px;
            top: -4px;
            height: 1.8em;
            margin-right: .8em;
            border-radius: 4px 0 0 4px;
          }
        `],
  directives: [HeroDetailComponent],
  template: `
    <h1>{{title}}</h1>

    <h2>My Heroes</h2>
    <ul class="heroes">
     <li *ngFor="let hero of heroes" (click)="onSelect(hero)" [class.selected]="hero === selectedHero">
      <span class="badge">{{hero.id}}</span> {{hero.name}}
     </li>
    </ul>
    <my-hero-detail [hero]="selectedHero"></my-hero-detail>
    `,
   providers: [HeroService]
})

export class AppComponent implements OnInit{
  public heroes: Hero[];
  title = 'Tour of Heroes';
  selectedHero: Hero;

  constructor(private heroService: HeroService) {
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
    this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
  }
}

