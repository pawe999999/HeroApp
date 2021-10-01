import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthBattleGurad } from 'src/app/auth/battleAuth.gurad';
import { BattleComponent } from './battle.component';

const routes: Routes = [
    {
        path: '',
        component: BattleComponent,
        canActivate: [AuthBattleGurad],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BattleRoutingModule {}
