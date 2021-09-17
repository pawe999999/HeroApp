import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserInfo } from 'src/app/models/userInfo.model';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logInForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      /* Validators.pattern(
        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
      ), */
    ]),
    password: new FormControl(null, [
      Validators.required,
      //Validators.pattern('^(?=.*?[A-Z])(?=.*?[#?!@$%^&*-])(?=.*?[0-9]).{5,}$'),
    ]),
  });

  onLogIn(): void {
    // Check if user exists
    for (let i = 0; i < localStorage.length; i++) {
      if (this.logInForm.value.email === localStorage.key(i)) {
        const user = JSON.parse(localStorage.getItem(localStorage.key(i)!)!);
        //chcek if password is correct
        if (this.logInForm.value.password === user.password) {
          this.router.navigate(['/heroes']);
          this.authService.logIn(
            new UserInfo(
              user.emial,
              user.email,
              user.password,
              user.id,
              new Date().getTime(), //Update start token
              new Date().getTime() + 3600000 // Upadte expiration token
            )
          );
          this.logInForm.reset();
          return;
        }
      }
    }
    this.logInForm.reset();
    alert('wrong input');
  }
}
