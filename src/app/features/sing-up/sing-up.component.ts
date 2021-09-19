import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { UserInfo } from 'src/app/models/userInfo.model';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss'],
})
export class SingUpComponent {
  constructor(private authService: AuthService) {}
  singUpForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      //Validators.email,
      /* Validators.pattern(
        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
      ), */
    ]),
    password: new FormControl(null, [
      Validators.required,
      //Validators.pattern('^(?=.*?[A-Z])(?=.*?[#?!@$%^&*-])(?=.*?[0-9]).{5,}$'),
    ]),
    username: new FormControl(null, [
      Validators.required,
      // Validators.minLength(8),
      //Validators.pattern('[a-zA-Z ]*'),
    ]),
  });
  onSingUp(): void {
    // Check if user already exists
    for (let i = 0; i < localStorage.length; i++) {
      if (this.singUpForm.value.email === localStorage.key(i)) {
        alert('user alredy exist');
        throw new Error('user exist');
      }
    }
    //create new user
    if (this.singUpForm.valid) {
      this.authService.singUp(
        new UserInfo(
          this.singUpForm.value.username,
          this.singUpForm.value.email,
          this.singUpForm.value.password,
          `${crypto.getRandomValues(new Uint8Array(8)).join('')}`
        )
      );
      alert('Account has been created');
    }
    this.singUpForm.reset();
  }
}
