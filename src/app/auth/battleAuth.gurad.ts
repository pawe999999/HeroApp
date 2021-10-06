import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HeroesService } from '../shared/services/heroes.service';

@Injectable({ providedIn: 'root' })
export class AuthBattleGurad implements CanActivate {
    constructor(private heroesService: HeroesService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot
    ): boolean | UrlTree | Promise<boolean> | Observable<boolean | UrlTree> {
        return this.heroesService.selectedHeroes$.pipe(
            map((hero) => {
                const isAuth = !!hero.length;
                if (isAuth) {
                    return true;
                }
                return this.router.createUrlTree(['/heroes']);
            })
        );
    }
}
