import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterSettings } from 'src/app/models/filterSettings.model';
import { Hero } from 'src/app/models/hero.model';
import { FilterOptions } from '../enums/filterOption.enum';

@Injectable({ providedIn: 'root' })
export class HeroesService {
    private heroesStream = new BehaviorSubject<Hero[]>([]);
    private seletedHeroes = new BehaviorSubject<Hero[]>([]);
    heroesId = [
        1, 64, 152, 215, 243, 251, 281, 307, 343, 352, 378, 403, 418, 423, 487,
        498, 514, 534, 540, 573, 655, 680, 686, 705, 729,
    ];
    constructor(private http: HttpClient) {}

    private filterStream = new BehaviorSubject<FilterSettings>({
        filterType: FilterOptions.ALL,
    });

    get selectedHeroes$(): Observable<Hero[]> {
        return this.seletedHeroes.asObservable();
    }
    get selectedHeroes(): Hero[] {
        return this.seletedHeroes.getValue();
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
        this.seletedHeroes.next([...this.selectedHeroes, hero]);
    }
}
