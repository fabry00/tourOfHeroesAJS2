import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Hero } from './hero';

// Used before simulate HTTP
//import { HEROES } from './mock-heroes';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {

  private heroesUrl = 'app/heroes';  // URL to web api
  constructor(private http: Http) { }

  // Used before simulate HTTP
  /*
  getHeroes() {
    // A Promise is ... well it's a promise to call us back later when the results are ready
    // We're still mocking the data. We're simulating the behavior of an ultra-fast, zero-latency server, 
    // by returning an immediately resolved Promise with our mock heroes as the result.
    
    //return Promise.resolve(HEROES);
  }*/
  getHeroes(): Promise<Hero[]> {
    /**
     * We're still returning a Promise but we're creating it differently.
     * The Angular http.get returns an RxJS Observable. Observables are a powerful 
     * way to manage asynchronous data flows. We'll learn about Observables later.
     * 
     */
    return this.http.get(this.heroesUrl)
      // For now we get back on familiar ground by immediately converting that Observable to a Promise using the toPromise operator.
      // There are scores of operators like toPromise that extend Observable with useful capabilities.
      // If we want those capabilities, we have to add the operators ourselves. That's as easy as importing them from the RxJS
      .toPromise()
      // In the promise's then callback we call the json method of the http Response to extract the data within the response.
      // That response JSON has a single data property. 
      // The data property holds the array of heroes that the caller really wants. 
      // So we grab that array and return it as the resolved Promise value.
      // This particular in-memory web API example happens to return an object with a data property. Your API might return something else.
      // Adjust the code to match your web API.
      .then(response => response.json().data)
      // This is a critical step! We must anticipate HTTP failures as they happen frequently for reasons beyond our control.
      .catch(this.handleError);
  }

  getHeroesSlowly() {
    /*return new Promise<Hero[]>(resolve =>
      setTimeout(() => resolve(HEROES), 2000) // 2 seconds
    );*/
  }

  getHero(id: number) {
    return this.getHeroes()
      .then(heroes => heroes.find(hero => hero.id === id));
  }

  delete(hero: Hero) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.heroesUrl}/${hero.id}`;

    return this.http
      .delete(url, headers)
      .toPromise()
      .catch(this.handleError);
  }

  /**
   * We combine the call to the private post and put methods in a single save method. 
   * This simplifies the public API and makes the integration
   * with HeroDetailComponent easier. HeroService determines which method to call based
   * on the state of the hero object. If the hero already has an id we know it's an 
   * edit. Otherwise we know it's an add.
   */
  save(hero: Hero): Promise<Hero> {
    if (hero.id) {
      return this.put(hero);
    }
    return this.post(hero);
  }

  // Add a New Hero
  private post(hero: Hero): Promise<Hero> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.heroesUrl, JSON.stringify(hero), { headers: headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  // Modify an hero
  private put(hero: Hero) {
    // Put will be used to update an individual hero. Its structure is very similar to 
    // Post requests. The only difference is that we have to change the url slightly 
    // by appending the id of the hero we want to update.
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = `${this.heroesUrl}/${hero.id}`;

    return this.http.put(url, JSON.stringify(hero), { headers: headers })
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);

  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

