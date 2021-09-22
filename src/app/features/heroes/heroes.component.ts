import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
    FilterOptions,
    FilterSettings,
    HeroesService,
} from 'src/app/shared/services/heroes.service';

@Component({
    selector: 'app-hero',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
    heroes!: Object[];
    heroNameInput!: FormGroup;
    popUp: boolean = false;
    items!: string[];
    alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

    constructor(private heroesService: HeroesService) {}

    ngOnInit() {
        this.heroNameInput = new FormGroup({
            heroName: new FormControl(
                '',
                Validators.pattern('^[-a-zA-Z]+(s+[-a-zA-Z])*$')
            ),
        });

        this.heroesService.updateFilters({
            filterType: FilterOptions.ALL,
        });

        this.heroesService.filters$
            .pipe(
                switchMap((filters: FilterSettings) => {
                    return this.heroesService.heroes$.pipe(
                        map((items: Object[]) => {
                            return items.filter((item: any) => {
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
            .subscribe((res: Object[]) => {
                this.heroes = res;
            });
    }

    onFilterByFirstLetter(letter: string): void {
        this.heroesService.updateFilters({
            filterType: FilterOptions.FIRSTLETTER,
            filterValue: letter,
        });
    }
    onFilterTitle(title: string): void {
        if (this.heroNameInput.valid) {
            this.heroesService.updateFilters({
                filterType: FilterOptions.TITLE,
                filterValue: title.toLowerCase(),
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
