import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './features/log-in/log-in.component';
import { SingUpComponent } from './features/sing-up/sing-up.component';

const routes: Routes = [
  {
    path: '',
    component: LogInComponent,
  },
  { path: 'singUp', component: SingUpComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
