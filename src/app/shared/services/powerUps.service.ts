import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PowerUps } from 'src/app/models/powerUps.model';

@Injectable({ providedIn: 'root' })
export class PowerUpsService {
    private powerUpsStream = new BehaviorSubject<PowerUps[]>([
        {
            img: 'https://cdn.al.to/i/setup/images/prod/big/product-new-big,,2021/2/pr_2021_2_16_15_10_44_883_00.jpg',
            name: 'Captain America shield',
            desc: '+10 durability',
            stats: {
                stat: 'durability',
                statAdded: 10,
            },
            uses: 3,
        },
        {
            img: 'https://a.allegroimg.com/s512/03efb2/ad61fb17489abadc7c1a869f2d7e/Mlot-THOR-Marvel-Mjolnir-KIDS-45-cm-1-1-z-Polski',
            name: 'Mjolnir',
            desc: '+10 power',
            stats: {
                stat: 'power',
                statAdded: 10,
            },
            uses: 0,
        },
        {
            img: 'https://cdn.myshoptet.com/usr/www.gamlery.pl/user/shop/big/21353_mega-tirelire-casque-iron-man-marvel--1.jpg?5fd360a9',
            name: 'Ironman nano armor',
            desc: '+10 combat',
            stats: {
                stat: 'combat',
                statAdded: 10,
            },
            uses: 3,
        },
        {
            img: 'https://cdn.shopify.com/s/files/1/1860/4593/products/Adult-Dr-Strange-Cloak-of-Levitation-Doctor-Strange-Red-Robe-Cape-Marvel-Comics-Cosplay-WickyDeez-1_grande.jpg?v=1602828389',
            name: "Dr. Strange's cloak",
            desc: '+10 intelligence',
            stats: {
                stat: 'intelligence',
                statAdded: 10,
            },
            uses: 3,
        },
        {
            img: 'https://www.superherorings.com/image/catalog/Green_Lantern_Ring_Snake.jpg',
            name: "Green lantern's ring",
            desc: '+10 strength',
            stats: {
                stat: 'strength',
                statAdded: 10,
            },
            uses: 3,
        },
        {
            img: 'https://www.xcoos.com/4490-large_default/barry-allen-s-new-boots-of-the-flash-season-4.jpg',
            name: 'Flash boots',
            desc: '+10 speed',
            stats: {
                stat: 'speed',
                statAdded: 10,
            },
            uses: 0,
        },
    ]);

    get powerUps$(): Observable<PowerUps[]> {
        return this.powerUpsStream.asObservable();
    }
    get powerUps(): PowerUps[] {
        return this.powerUpsStream.getValue();
    }
    updatePowerUps(items: PowerUps[]): void {
        this.powerUpsStream.next(items);
    }
}
