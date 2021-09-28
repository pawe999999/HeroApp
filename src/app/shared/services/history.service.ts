import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HistoryInfo } from 'src/app/models/history.model';
import { SortSettings } from 'src/app/models/sortSetting.model';
import { SortOptions } from '../enums/sortOptions.enum';

@Injectable({ providedIn: 'root' })
export class HistoryService {
    private historyItemStream = new BehaviorSubject<HistoryInfo[]>([
        {
            hero: 'Test1',
            opponent: 'Test2',
            date: Date.now(),
            result: 'Win',
            id: 1,
        },
        {
            hero: 'Test3',
            opponent: 'Test4',
            date: Date.now() + 1,
            result: 'Lose',
            id: 2,
        },
    ]);
    private sortStream = new BehaviorSubject<SortSettings>({
        sortType: SortOptions.DATE,
    });

    get sort$(): Observable<SortSettings> {
        return this.sortStream.asObservable();
    }

    get historyItems$(): Observable<HistoryInfo[]> {
        return this.historyItemStream.asObservable();
    }
    get historyItems(): HistoryInfo[] {
        return this.historyItemStream.getValue();
    }
    updateSorting(sortingSettings: SortSettings): void {
        this.sortStream.next(sortingSettings);
    }
    addHistoryItem(item: HistoryInfo) {
        this.historyItemStream.next([...this.historyItems, item]);
    }
}
