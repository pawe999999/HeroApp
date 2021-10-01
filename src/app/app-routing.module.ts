import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { LogInComponent } from './features/log-in/log-in.component';

const appRoutes: Routes = [
    {
        path: 'log-in',
        component: LogInComponent,
    },
    {
        path: 'sing-up',
        loadChildren: () =>
            import('./features/sing-up/sing-up.module').then(
                (m) => m.SingUpModule
            ),
    },
    {
        path: 'hero/:name',
        loadChildren: () =>
            import('./features/hero-info/hero-info.module').then(
                (m) => m.HeroInfoModule
            ),
    },
    {
        path: 'heroes',
        loadChildren: () =>
            import('./features/heroes/heroes.module').then(
                (m) => m.HeroesModule
            ),
    },
    {
        path: 'battle',
        loadChildren: () =>
            import('./features/battle/battle.module').then(
                (m) => m.BattleModule
            ),
    },

    {
        path: 'user-info',
        loadChildren: () =>
            import('./features/user-info/user-info.module').then(
                (m) => m.UserInfoModule
            ),
    },

    { path: '**', redirectTo: '/heroes' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            preloadingStrategy: PreloadAllModules,
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
