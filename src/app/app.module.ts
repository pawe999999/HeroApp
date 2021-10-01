import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogInModule } from './features/log-in/log-in.module';
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
import { BattleModule } from './features/battle/battle.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        LogInModule,
        NavModule,
        HeroesModule,
        UserInfoModule,
        HeroInfoModule,
        BattleModule,
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
