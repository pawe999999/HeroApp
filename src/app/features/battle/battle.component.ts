import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { Hero } from 'src/app/models/hero.model';
import { PowerUps } from 'src/app/models/powerUps.model';
import { HeroesService } from 'src/app/shared/services/heroes.service';
import { HistoryService } from 'src/app/shared/services/history.service';
import { PowerUpsService } from 'src/app/shared/services/powerUps.service';

@Component({
    selector: 'app-battle',
    templateUrl: './battle.component.html',
    styleUrls: ['./battle.component.scss'],
})
export class BattleComponent implements OnInit, OnDestroy {
    selectedHero!: Hero;
    opponentHero!: Hero;
    powerUps!: PowerUps[];
    result!: string;
    showResult: boolean = false;
    durration: number | null = 5;
    powerUpsStats: number = 0;
    private subscription: Subscription = new Subscription();
    constructor(
        private heroesService: HeroesService,
        private powerUpsService: PowerUpsService,
        private historyService: HistoryService
    ) {}

    ngOnInit(): void {
        this.subscription.add(
            this.heroesService.selectedHeroes$.subscribe((res) => {
                this.selectedHero = res[res.length - 1];
            })
        );
        this.subscription.add(
            this.powerUpsService.powerUps$.subscribe((res) => {
                this.powerUps = res;
            })
        );
        this.opponentHero =
            this.heroesService.heroes[Math.floor(Math.random() * 24) + 1];
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    startBattle() {
        const time = timer(0, 1000).subscribe((res) => {
            this.showResultWindow();
            this.durration!--;
            if (res === 4) {
                time.unsubscribe();
                this.setBattleData();
            }
        });
    }
    usePowerUp(item: PowerUps): void {
        if (item.uses > 0) {
            item.uses--;
            this.powerUpsStats += item.stats.statAdded;

            this.powerUpsService.updatePowerUps(this.powerUps);
        }
    }

    showResultWindow() {
        this.showResult = true;
    }
    checkResult() {
        let selectedHeroPower: number = 0;
        let opponentHeroPower: number = 0;
        for (const [_, value] of Object.entries(this.selectedHero.powerstats)) {
            selectedHeroPower += +value;
        }
        for (const [_, value] of Object.entries(this.opponentHero.powerstats)) {
            opponentHeroPower += +value;
        }
        selectedHeroPower += this.powerUpsStats;

        return selectedHeroPower > opponentHeroPower ? 'Win' : 'Lose';
    }
    setBattleData() {
        this.durration = null;
        this.result = this.checkResult();
        this.historyService.addHistoryItem({
            hero: this.selectedHero.name,
            opponent: this.opponentHero.name,
            date: Date.now(),
            result: this.result,
            id: Math.floor(Math.random() * 10000) + 1,
        });
    }
}
