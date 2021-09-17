import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LogInComponent } from './log-in.component';

@NgModule({
  declarations: [LogInComponent],
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  exports: [LogInComponent],
})
export class LogInModule {}
