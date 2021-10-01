import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes.component';

const routes: Routes = [
    {
        path: '',
        component: HeroesComponent,
        canActivate: [AuthGuard],
        children: [{ path: '', component: HeroDetailComponent }],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HeroesRoutingModule {}
