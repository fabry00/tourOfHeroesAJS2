import { Injectable } from '@angular/core';

import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {
  getHeroes() {
        // A Promise is ... well it's a promise to call us back later when the results are ready
        // We're still mocking the data. We're simulating the behavior of an ultra-fast, zero-latency server, 
        // by returning an immediately resolved Promise with our mock heroes as the result.
        return Promise.resolve(HEROES);
  }
  
  getHeroesSlowly() {
          return new Promise<Hero[]>(resolve =>
            setTimeout(() => resolve(HEROES), 2000) // 2 seconds
          );
        }
}

