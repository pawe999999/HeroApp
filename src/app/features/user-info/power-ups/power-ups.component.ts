import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PowerUps } from 'src/app/models/powerUps.model';
import { PowerUpsService } from 'src/app/shared/services/powerUps.service';

@Component({
    selector: 'app-power-ups',
    templateUrl: './power-ups.component.html',
    styleUrls: ['./power-ups.component.scss'],
})
export class PowerUpsComponent implements OnInit, OnDestroy {
    items!: PowerUps[];
    private subscription!: Subscription;

    constructor(private powerUpsService: PowerUpsService) {}
    ngOnInit(): void {
        this.subscription = this.powerUpsService.powerUps$.subscribe((res) => {
            this.items = res.sort((a, b) => {
                if (a.uses < b.uses) {
                    return 1;
                }
                if (a.uses > b.uses) {
                    return -1;
                }
                return 0;
            });
        });
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    useItem(item: PowerUps): void {
        if (item.uses > 0) {
            item.uses--;
            this.powerUpsService.updatePowerUps(this.items);
        }
    }
}
