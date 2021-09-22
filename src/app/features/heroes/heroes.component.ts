import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HeroesService } from 'src/app/shared/services/heroes.service';
import { Hero } from 'src/app/models/hero.model';
import { FilterOptions } from 'src/app/shared/enums/filterOption.enum';
import { Subscription } from 'rxjs';
import { FilterSettings } from 'src/app/models/filterSettings.model';

@Component({
    selector: 'app-hero',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit, OnDestroy {
    heroes!: Hero[];
    heroNameInput!: FormGroup;
    popUp: boolean = false;
    items!: string[];
    subscription!: Subscription;
    subscriptions: Subscription[] = [];
    alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

    constructor(private heroesService: HeroesService) {}

    ngOnInit() {
        this.heroNameInput = new FormGroup({
            heroName: new FormControl(
                '',
                Validators.pattern('^[-a-zA-Z]+(s+[-a-zA-Z])*$')
            ),
        });
        if (this.heroesService.heroes.length === 0) {
            let sub: Subscription;
            for (let i = 1; i < 7; i++) {
                sub = this.heroesService.getHeroes2(i).subscribe((res) => {
                    this.heroes.push(res);
                    this.heroesService.updateHeroes(this.heroes);
                });
                this.subscriptions.push(sub);
            }
        }

        this.subscription = this.heroesService.filters$
            .pipe(
                switchMap((filters: FilterSettings) => {
                    return this.heroesService.heroes$.pipe(
                        map((items: Hero[]) => {
                            return items.filter((item: Hero) => {
                                if (filters.filterType === FilterOptions.ALL) {
                                    return item;
                                }
                                if (
                                    filters.filterType === FilterOptions.TITLE
                                ) {
                                    return item.name
                                        .toLowerCase()
                                        .includes(filters.filterValue!);
                                }
                                if (
                                    filters.filterType ===
                                    FilterOptions.FIRSTLETTER
                                ) {
                                    return item.name.startsWith(
                                        filters.filterValue!
                                    );
                                }

                                return;
                            });
                        })
                    );
                })
            )
            .subscribe((res: Hero[]) => {
                this.heroes = res;
            });
    }
    ngOnDestroy(): void {
        this.heroesService.updateFilters({
            filterType: FilterOptions.ALL,
        });

        this.subscriptions.map((item) => {
            return item.unsubscribe();
        });
        this.subscription.unsubscribe();
    }
    onFilterByFirstLetter(letter: string): void {
        this.heroesService.updateFilters({
            filterType: FilterOptions.FIRSTLETTER,
            filterValue: letter,
        });
    }
    onFilterTitle(): void {
        const title = this.heroNameInput.get('heroName')?.value.toLowerCase();
        if (this.heroNameInput.valid) {
            this.heroesService.updateFilters({
                filterType: FilterOptions.TITLE,
                filterValue: title,
            });
            if (title) {
                sessionStorage.setItem(title, title);
            }
        }
    }
    showRecent(): void {
        this.popUp = !this.popUp;
        this.items = Object.keys(sessionStorage);
    }
    selectRecent(index: number): void {
        this.popUp = !this.popUp;
        this.heroNameInput.get('heroName')?.setValue(this.items[index]);
    }
}
