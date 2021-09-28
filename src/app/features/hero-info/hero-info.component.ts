import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Hero } from 'src/app/models/hero.model';
import { HeroesService } from 'src/app/shared/services/heroes.service';

@Component({
    selector: 'app-hero-info',
    templateUrl: './hero-info.component.html',
    styleUrls: ['./hero-info.component.scss'],
})
export class HeroInfoComponent implements OnInit {
    name!: string;
    hero!: Hero | undefined;

    constructor(
        private route: ActivatedRoute,
        private heroesService: HeroesService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.name = params['name'];
            this.hero = this.heroesService.getHero(this.name);
        });
    }
}
