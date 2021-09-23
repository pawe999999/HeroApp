import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HeroesService } from 'src/app/shared/services/heroes.service';
import { Hero } from 'src/app/models/hero.model';
import { FilterOptions } from 'src/app/shared/enums/filterOption.enum';
import { Subscription } from 'rxjs';
import { FilterSettings } from 'src/app/models/filterSettings.model';
import { heroesUrlService } from 'src/app/shared/services/heroesUrl.service';

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
    subscriptions: Subscription[] = [];
    searchByLetter: boolean = false;
    searchLetter: string = 'A';
    alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
    private subscription: Subscription = new Subscription();
    constructor(
        private heroesService: HeroesService,
        private heroesUrlService: heroesUrlService
    ) {}

    ngOnInit() {
        this.createForm();
        this.checkHeroesList();
        console.log(this.searchLetter);

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
                                    FilterOptions.FIRST_LETTER
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
        this.subscription.unsubscribe();
    }
    onFilterByFirstLetter(letter: string): void {
        this.openSearch();
        this.searchLetter = letter;
        this.heroesService.updateFilters({
            filterType: FilterOptions.FIRST_LETTER,
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
    checkHeroesList() {
        if (this.heroesService.heroes.length === 0) {
            let sub: Subscription;
            for (const id of this.heroesService.heroesId) {
                sub = this.heroesUrlService.getHeroes(id).subscribe((res) => {
                    this.heroes.push(res);
                    this.heroesService.updateHeroes(this.heroes);
                });
                this.subscription.add(sub);
            }
        }
    }
    createForm() {
        this.heroNameInput = new FormGroup({
            heroName: new FormControl(
                '',
                Validators.pattern('^[-a-zA-Z]+(s+[-a-zA-Z])*$')
            ),
        });
        this.subscription.add(
            this.heroNameInput.get('heroName')?.valueChanges.subscribe(() => {
                this.onFilterTitle();
            })
        );
    }
    openSearch() {
        this.searchByLetter = !this.searchByLetter;
    }
}
