import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeroesRoutingModule } from './heroes.routing.module';

@NgModule({
    declarations: [HeroesComponent, HeroDetailComponent],
    imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        HeroesRoutingModule,
    ],
    exports: [HeroesComponent],
})
export class HeroesModule {}
