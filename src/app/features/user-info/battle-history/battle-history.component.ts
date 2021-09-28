import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { HistoryInfo } from 'src/app/models/history.model';
import { SortSettings } from 'src/app/models/sortSetting.model';
import { SortOptions } from 'src/app/shared/enums/sortOptions.enum';
import { HistoryService } from 'src/app/shared/services/history.service';

@Component({
    selector: 'app-battle-history',
    templateUrl: './battle-history.component.html',
    styleUrls: ['./battle-history.component.scss'],
})
export class BattleHistoryComponent implements OnInit, OnDestroy {
    historyItems: HistoryInfo[] = [];
    private subscription!: Subscription;

    constructor(private historyService: HistoryService) {}

    ngOnInit(): void {
        this.subscription = this.historyService.sort$
            .pipe(
                switchMap((sort: SortSettings) => {
                    return this.historyService.historyItems$.pipe(
                        map((items: HistoryInfo[]) => {
                            return this.sortItems(items, sort.sortType);
                        })
                    );
                })
            )
            .subscribe((res: HistoryInfo[]) => {
                this.historyItems = res;
            });
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    sortItems(
        items: HistoryInfo[],
        property: keyof HistoryInfo
    ): HistoryInfo[] {
        return items.sort((a, b) => {
            if (a[property] < b[property]) {
                return -1;
            }
            if (a[property] > b[property]) {
                return 1;
            }
            return 0;
        });
    }
    sortByHero(): void {
        this.historyService.updateSorting({
            sortType: SortOptions.HERO,
        });
    }
    sortByOpponent(): void {
        this.historyService.updateSorting({
            sortType: SortOptions.OPPONENT,
        });
    }
    sortByDate(): void {
        this.historyService.updateSorting({
            sortType: SortOptions.DATE,
        });
    }
    sortByResult(): void {
        this.historyService.updateSorting({
            sortType: SortOptions.RESULT,
        });
    }
}
