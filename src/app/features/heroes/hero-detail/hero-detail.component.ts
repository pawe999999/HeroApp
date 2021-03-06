import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from 'src/app/models/hero.model';
import { HeroesService } from 'src/app/shared/services/heroes.service';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroDetailComponent implements OnInit {
    selected: boolean = false;
    @Input() hero!: Hero;

    constructor(private heroesService: HeroesService, private router: Router) {}

    ngOnInit(): void {
        this.checkSelection();
    }
    checkSelection(): void {
        this.selected = this.heroesService.selectedHeroes.includes(this.hero);
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
    viewHero(): void {
        this.router.navigate([`/hero/${this.hero.name}`]);
    }
}
