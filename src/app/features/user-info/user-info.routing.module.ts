import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { BattleHistoryComponent } from './battle-history/battle-history.component';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { PowerUpsComponent } from './power-ups/power-ups.component';
import { UserInfoComponent } from './user-info.component';

const routes: Routes = [
    {
        path: '',
        component: UserInfoComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'heroes-list',
                component: HeroesListComponent,
            },
            {
                path: 'power-ups',
                component: PowerUpsComponent,
            },
            {
                path: 'battle-history',
                component: BattleHistoryComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserInfoRoutingModule {}
