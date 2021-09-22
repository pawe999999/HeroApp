import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterSettings } from 'src/app/models/filterSettings.model';
import { Hero } from 'src/app/models/hero.model';
import { FilterOptions } from '../enums/filterOption.enum';

@Injectable({ providedIn: 'root' })
export class HeroesService {
    private heroesStream = new BehaviorSubject<Hero[]>([]);

    constructor(private http: HttpClient) {}

    private filterStream = new BehaviorSubject<FilterSettings>({
        filterType: FilterOptions.ALL,
    });
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
    updateHeroes(items: any[]) {
        this.heroesStream.next(items);
    }

    getHeroes2(index: number): Observable<Hero> {
        return this.http.get<Hero>(`http://localhost:4200/heroes-data${index}`);
    }
}
