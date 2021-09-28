import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterSettings } from 'src/app/models/filterSettings.model';
import { Hero } from 'src/app/models/hero.model';
import { FilterOptions } from '../enums/filterOption.enum';

@Injectable({ providedIn: 'root' })
export class HeroesService {
    heroesId = [
        1, 64, 152, 215, 243, 251, 281, 307, 343, 352, 378, 403, 418, 423, 487,
        498, 514, 534, 540, 573, 655, 680, 686, 705, 729,
    ];

    private heroesStream = new BehaviorSubject<Hero[]>([]);
    private selectedHeroesStream = new BehaviorSubject<Hero[]>([]);

    constructor(private http: HttpClient) {}

    private filterStream = new BehaviorSubject<FilterSettings>({
        filterType: FilterOptions.ALL,
    });

    get selectedHeroes$(): Observable<Hero[]> {
        return this.selectedHeroesStream.asObservable();
    }
    get selectedHeroes(): Hero[] {
        return this.selectedHeroesStream.getValue();
    }

    get filters$(): Observable<FilterSettings> {
        return this.filterStream.asObservable();
    }

    get heroes$(): Observable<Hero[]> {
        return this.heroesStream.asObservable();
    }
    get heroes(): Hero[] {
        return this.heroesStream.getValue();
    }
    updateFilters(filtersSettings: FilterSettings): void {
        this.filterStream.next(filtersSettings);
    }
    updateHeroes(items: Hero[]): void {
        this.heroesStream.next(items);
    }
    selectHero(hero: Hero): void {
        this.selectedHeroesStream.next([...this.selectedHeroes, hero]);
    }
    deleteSelectedHero(hero: Hero): void {
        this.selectedHeroesStream.next(
            this.selectedHeroes.filter(({ id }: Hero) => {
                return hero.id !== id;
            })
        );
    }
    getHero(name: string): Hero | undefined {
        return this.heroes.find((item) => {
            return item.name === name;
        });
    }
}
