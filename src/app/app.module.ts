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
import { HistoryService } from './shared/services/history.service';
import { PowerUpsService } from './shared/services/powerUps.service';
import { HeroInfoModule } from './features/hero-info/hero-info.module';

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
        HeroInfoModule,
    ],
    providers: [
        AuthService,
        HeroesService,
        heroesUrlService,
        HistoryService,
        PowerUpsService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
