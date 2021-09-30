import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { HeroesService } from 'src/app/shared/services/heroes.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
    status: boolean = false;
    heroesStatus: boolean = false;
    private subscription: Subscription = new Subscription();
    constructor(
        private authService: AuthService,
        private heroesService: HeroesService
    ) {}

    ngOnInit(): void {
        this.subscription.add(
            this.authService.user.subscribe((user) => {
                this.status = !!user;
            })
        );
        this.subscription.add(
            this.heroesService.selectedHeroes$.subscribe((heroes) => {
                this.heroesStatus = heroes.length !== 0;
            })
        );
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    logOut(): void {
        this.authService.logout();
        this.status = false;
    }
}
