import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { HeroesService } from '../services/heroes.service';

@Injectable({
  providedIn: 'root',
})
export class HeroResolve implements Resolve<any> {
  constructor(private heroesService: HeroesService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const heroes = this.heroesService.heroes;
    if (heroes.length === 0) {
      return this.heroesService.getHeroes();
    } else {
      return heroes;
    }
  }
}
