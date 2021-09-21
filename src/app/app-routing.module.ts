import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HeroesComponent } from './features/heroes/heroes.component';
import { LogInComponent } from './features/log-in/log-in.component';
import { SingUpComponent } from './features/sing-up/sing-up.component';

const routes: Routes = [
  {
    path: 'log-in',
    component: LogInComponent,
  },
  { path: 'sing-up', component: SingUpComponent },
  { path: 'heroes', component: HeroesComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/log-in' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
