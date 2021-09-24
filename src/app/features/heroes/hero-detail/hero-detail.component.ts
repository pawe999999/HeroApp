import { Component, Input, OnInit } from '@angular/core';
import { Hero } from 'src/app/models/hero.model';
import { HeroesService } from 'src/app/shared/services/heroes.service';
import { HeroesModule } from '../heroes.module';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
    constructor(private heroesService: HeroesService) {}
    @Input() hero!: Hero;
    selected: boolean = false;

    ngOnInit() {
        this.isSelected();
    }
    onSelect() {
        this.selected = true;
        this.heroesService.selectHero(this.hero);
        this.isSelected();
    }
    isSelected() {
        if (this.heroesService.selectedHeroes.includes(this.hero)) {
            this.selected = true;
        }
    }
}
