import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogInModule } from './features/log-in/log-in.module';
import { SingUpModule } from './features/sing-up/sing-up.module';
import { NavModule } from './features/nav/nav.module';
import { AuthService } from './auth/auth.service';
import { HeroesModule } from './features/heroes/heroes.module';
import { HeroesService } from './shared/services/heroes.service';
import { HttpClientModule } from '@angular/common/http';
import { heroesUrlService } from './shared/services/heroesUrl.service';
import { UserInfoModule } from './features/user-info/user-info.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        LogInModule,
        SingUpModule,
        NavModule,
        HeroesModule,
        UserInfoModule,
    ],
    providers: [AuthService, HeroesService, heroesUrlService],
    bootstrap: [AppComponent],
})
export class AppModule {}
