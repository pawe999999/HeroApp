import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum FilterOptions {
    ALL,
    TITLE,
    FIRSTLETTER,
}
export interface FilterSettings {
    filterType: FilterOptions;
    filterValue?: string;
}

@Injectable({ providedIn: 'root' })
export class HeroesService {
    private heroesStream = new BehaviorSubject<any[]>([]);

    constructor(private http: HttpClient) {}

    private filterStream = new BehaviorSubject<FilterSettings>({
        filterType: FilterOptions.ALL,
    });
    get filters$(): Observable<FilterSettings> {
        return this.filterStream.asObservable();
    }

    get heroes$(): Observable<any[]> {
        return this.heroesStream.asObservable();
    }
    get heroes(): Object[] {
        return this.heroesStream.getValue();
    }
    updateFilters(filtersSettings: FilterSettings): void {
        this.filterStream.next(filtersSettings);
    }

    getHeroes(): void {
        const arr: Object[] = [];
        for (let i = 1; i < 7; i++) {
            this.http
                .get(`http://localhost:4200/heroes-data${i}`)
                .pipe(
                    map((hero: Object) => {
                        arr.push(hero);
                        return arr;
                    })
                )
                .subscribe((res: Object[]) => {
                    this.heroesStream.next(res);
                });
        }
    }
}
