import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss'],
})
export class SingUpComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  singUpForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
      Validators.pattern('^w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/'),
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
