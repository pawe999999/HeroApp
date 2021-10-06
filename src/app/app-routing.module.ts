import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthBattleGurad } from './auth/battleAuth.gurad';

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
        canActivate: [AuthGuard],
    },
    {
        path: 'heroes',
        loadChildren: () =>
            import('./features/heroes/heroes.module').then(
                (m) => m.HeroesModule
            ),
        canActivate: [AuthGuard],
    },
    {
        path: 'battle',
        loadChildren: () =>
            import('./features/battle/battle.module').then(
                (m) => m.BattleModule
            ),
        canActivate: [AuthGuard, AuthBattleGurad],
    },

    {
        path: 'user-info',
        loadChildren: () =>
            import('./features/user-info/user-info.module').then(
                (m) => m.UserInfoModule
            ),
        canActivate: [AuthGuard],
    },

    { path: '**', redirectTo: '/heroes' },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
