import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeroInfoComponent } from './hero-info.component';

@NgModule({
    declarations: [HeroInfoComponent],
    imports: [RouterModule, CommonModule],
    exports: [HeroInfoComponent],
})
export class HeroInfoModule {}
