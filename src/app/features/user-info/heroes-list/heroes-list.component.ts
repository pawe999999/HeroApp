import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hero } from 'src/app/models/hero.model';
import { HeroesService } from 'src/app/shared/services/heroes.service';

@Component({
    selector: 'app-heroes-list',
    templateUrl: './heroes-list.component.html',
    styleUrls: ['./heroes-list.component.scss'],
})
export class HeroesListComponent implements OnInit, OnDestroy {
    heroes!: Hero[];
    index: number = 0;
    selectedHero!: Hero;
    isHeroesSelected!: boolean;
    private subscription: Subscription = new Subscription();

    constructor(private heroesService: HeroesService) {}

    ngOnInit(): void {
        this.subscription.add(
            this.heroesService.selectedHeroes$.subscribe((res: Hero[]) => {
                this.heroes = res;
                this.selectedHero = this.heroes[this.heroes.length - 1];
                this.isHeroesSelected = res.length === 0 ? false : true;
            })
        );
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    selectThisHero(): void {
        this.selectedHero = this.heroes[this.index];
    }
    deleteThisHero(): void {
        if (this.selectedHero.id === this.heroes[this.index].id) {
            this.heroesService.deleteSelectedHero(this.selectedHero);
        } else {
            this.heroesService.deleteSelectedHero(this.heroes[this.index]);
        }
        this.index = this.heroes.length - 1;
    }

    onLeftClick(): void {
        if (this.index === 0) {
            this.index = this.heroes!.length - 1;
        } else {
            this.index--;
        }
    }
    onRightClick(): void {
        if (this.heroes.length - 1 === this.index) {
            this.index = 0;
        } else {
            this.index++;
        }
    }
}
