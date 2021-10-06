import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeroInfoComponent } from './hero-info.component';
import { HeroInfoRoutingModule } from './hero-info.routing.module';

@NgModule({
    declarations: [HeroInfoComponent],
    imports: [RouterModule, CommonModule, HeroInfoRoutingModule],
    exports: [HeroInfoComponent],
})
export class HeroInfoModule {}
