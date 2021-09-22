import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from 'src/app/models/hero.model';

@Injectable({ providedIn: 'root' })
export class heroesUrlService {
    constructor(private http: HttpClient) {}
    getHeroes(index: number): Observable<Hero> {
        return this.http.get<Hero>(
            `https://superheroapi.com/api.php/4509571742421677/${index}`
        );
    }
}
