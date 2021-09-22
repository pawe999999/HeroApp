import { Component, Input, OnInit } from '@angular/core';
import { Hero } from 'src/app/models/hero.model';
import { HeroesModule } from '../heroes.module';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
    @Input() hero!: Hero;
    src!: string;
    selected: boolean = false;

    ngOnInit() {
        this.src = this.hero.image.url;
    }
    onSelect() {
        this.selected = true;
    }
}
