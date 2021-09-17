import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss'],
})
export class SingUpComponent {
  singUpForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
      Validators.pattern(
        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
      ),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[#?!@$%^&*-])(?=.*?[0-9]).{5,}$'),
    ]),
    username: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('[a-zA-Z ]*'),
    ]),
  });
}
