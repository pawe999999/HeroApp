import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './features/log-in/log-in.component';
import { SingUpComponent } from './features/sing-up/sing-up.component';

const routes: Routes = [
  {
    path: 'log-in',
    component: LogInComponent,
  },
  { path: 'sing-up', component: SingUpComponent },
  { path: '**', redirectTo: '/log-in' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
