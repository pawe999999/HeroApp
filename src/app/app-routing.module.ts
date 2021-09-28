import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HeroInfoComponent } from './features/hero-info/hero-info.component';
import { HeroesComponent } from './features/heroes/heroes.component';
import { LogInComponent } from './features/log-in/log-in.component';
import { SingUpComponent } from './features/sing-up/sing-up.component';
import { BattleHistoryComponent } from './features/user-info/battle-history/battle-history.component';
import { HeroesListComponent } from './features/user-info/heroes-list/heroes-list.component';
import { PowerUpsComponent } from './features/user-info/power-ups/power-ups.component';
import { UserInfoComponent } from './features/user-info/user-info.component';

const routes: Routes = [
    {
        path: 'log-in',
        component: LogInComponent,
    },
    { path: 'sing-up', component: SingUpComponent },
    { path: 'hero/:name', component: HeroInfoComponent },

    {
        path: 'heroes',
        component: HeroesComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'user-info',
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
    { path: '**', redirectTo: '/log-in' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
