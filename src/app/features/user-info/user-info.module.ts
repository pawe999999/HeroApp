import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserInfoComponent } from './user-info.component';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { PowerUpsComponent } from './power-ups/power-ups.component';
import { BattleHistoryComponent } from './battle-history/battle-history.component';

@NgModule({
    declarations: [
        UserInfoComponent,
        HeroesListComponent,
        PowerUpsComponent,
        BattleHistoryComponent,
    ],
    imports: [RouterModule, CommonModule],
    exports: [
        UserInfoComponent,
        HeroesListComponent,
        PowerUpsComponent,
        BattleHistoryComponent,
    ],
})
export class UserInfoModule {}
