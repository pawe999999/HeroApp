import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {
  logInForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
      ),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[#?!@$%^&*-])(?=.*?[0-9]).{5,}$'),
    ]),
  });
}
