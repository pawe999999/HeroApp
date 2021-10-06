import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SingUpComponent } from './sing-up.component';
import { SingUpRoutingModule } from './sing-up.routing.module';

@NgModule({
    declarations: [SingUpComponent],
    imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        SingUpRoutingModule,
    ],
    exports: [SingUpComponent],
})
export class SingUpModule {}
