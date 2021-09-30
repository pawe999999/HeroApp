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
    usePowerup: boolean = false;
    powerUpItem!: PowerUps;
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
        this.usePowerup = true;
        this.powerUpItem = item;
    }

    showResultWindow() {
        this.showResult = true;
    }
    checkResult() {
        let selectedHeroPower: number = 0;
        let opponentHeroPower: number = 0;

        selectedHeroPower = Object.values(this.selectedHero.powerstats)
            .map((item) => {
                return +item;
            })
            .reduce((a, b) => {
                return a + b;
            });

        opponentHeroPower = Object.values(this.opponentHero.powerstats)
            .map((item) => {
                return +item;
            })
            .reduce((a, b) => {
                return a + b;
            });

        if (this.usePowerup) {
            selectedHeroPower += this.powerUpItem.stats.statAdded;
            this.powerUpItem.uses--;
            this.powerUpsService.updatePowerUps(this.powerUps);
        }

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
