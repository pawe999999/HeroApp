import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserInfo } from 'src/app/models/userInfo.model';

@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogInComponent {
    constructor(private authService: AuthService, private router: Router) {}

    logInForm = new FormGroup({
        email: new FormControl(null, [
            Validators.required,
            Validators.pattern(
                "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
            ),
        ]),
        password: new FormControl(null, [
            Validators.required,
            Validators.pattern(
                '^(?=.*?[A-Z])(?=.*?[#?!@$%^&*-])(?=.*?[0-9]).{5,}$'
            ),
        ]),
    });

    onLogIn(): void {
        const user = this.authService.checkIfUserExists(
            this.logInForm.value.email
        );
        if (this.logInForm.value.password === user!.password) {
            this.authService.logIn(
                new UserInfo(
                    user!.email,
                    user!.email,
                    user!.password,
                    user!.id,
                    new Date().getTime(), //Update start token
                    new Date().getTime() + 3600000 // Upadte expiration token
                )
            );
            this.router.navigate(['/heroes']);
            this.logInForm.reset();
            return;
        }

        this.logInForm.reset();
        alert('wrong input');
    }
}
