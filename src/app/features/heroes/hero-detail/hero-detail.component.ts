import { Component, Input, OnInit } from '@angular/core';
import { Hero } from 'src/app/models/hero.model';
import { HeroesService } from 'src/app/shared/services/heroes.service';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
    @Input() hero!: Hero;
    selected: boolean = false;
    constructor(private heroesService: HeroesService) {}
    ngOnInit(): void {
        this.checkSelection();
    }
    checkSelection(): void {
        if (this.heroesService.selectedHeroes.includes(this.hero)) {
            this.selected = true;
        } else {
            this.selected = false;
        }
    }

    changeHeroSelection(): void {
        if (this.heroesService.selectedHeroes.includes(this.hero)) {
            this.heroesService.deleteSelectedHero(this.hero);
            this.selected = false;
        } else {
            this.selected = true;
            this.heroesService.selectHero(this.hero);
        }
    }
}
