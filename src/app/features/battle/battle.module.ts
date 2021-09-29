import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BattleComponent } from './battle.component';

@NgModule({
    declarations: [BattleComponent],
    imports: [RouterModule, CommonModule],
    exports: [BattleComponent],
})
export class BattleModule {}
