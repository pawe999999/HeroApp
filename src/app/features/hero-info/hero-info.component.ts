import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Hero } from 'src/app/models/hero.model';
import { HeroesService } from 'src/app/shared/services/heroes.service';

@Component({
    selector: 'app-hero-info',
    templateUrl: './hero-info.component.html',
    styleUrls: ['./hero-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroInfoComponent implements OnInit, OnDestroy {
    name!: string;
    hero!: Hero | undefined;
    private subscription!: Subscription;

    constructor(
        private route: ActivatedRoute,
        private heroesService: HeroesService
    ) {}

    ngOnInit(): void {
        this.subscription = this.route.params.subscribe((params: Params) => {
            this.name = params?.name;
            this.hero = this.heroesService.getHero(this.name);
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
