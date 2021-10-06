import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BattleComponent } from './battle.component';
import { BattleRoutingModule } from './battle.routing.module';

@NgModule({
    declarations: [BattleComponent],
    imports: [RouterModule, CommonModule, BattleRoutingModule],
    exports: [BattleComponent],
})
export class BattleModule {}
