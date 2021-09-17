import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogInModule } from './features/log-in/log-in.module';
import { SingUpModule } from './features/sing-up/sing-up.module';
import { NavModule } from './features/nav/nav.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    LogInModule,
    SingUpModule,
    NavModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
