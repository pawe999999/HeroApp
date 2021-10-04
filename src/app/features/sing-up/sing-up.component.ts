import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { UserInfo } from 'src/app/models/userInfo.model';

@Component({
    selector: 'app-sing-up',
    templateUrl: './sing-up.component.html',
    styleUrls: ['./sing-up.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingUpComponent {
    constructor(private authService: AuthService) {}
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
            Validators.pattern(
                '^(?=.*?[A-Z])(?=.*?[#?!@$%^&*-])(?=.*?[0-9]).{5,}$'
            ),
        ]),
        username: new FormControl(null, [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern('[a-zA-Z ]*'),
        ]),
    });
    onSingUp(): void {
        const user = this.authService.checkIfUserExists(
            this.singUpForm.value.email
        );
        if (this.singUpForm.valid && !user) {
            this.authService.singUp(
                new UserInfo(
                    this.singUpForm.value.username,
                    this.singUpForm.value.email,
                    this.singUpForm.value.password,
                    `${crypto.getRandomValues(new Uint8Array(8)).join('')}`
                )
            );
            alert('Account has been created');
            this.singUpForm.reset();
            return;
        }
        this.singUpForm.reset();
        alert('User exisists');
    }
}
