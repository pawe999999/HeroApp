import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from '../models/userInfo.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private router: Router) {}
    user = new BehaviorSubject<UserInfo | null>(null);

    singUp(user: UserInfo): void {
        localStorage.setItem(user.username, JSON.stringify(user));
    }

    logIn(user: UserInfo): void {
        localStorage.setItem('activeUser', JSON.stringify(user)); //create special key in LS for logged in user
        this.router.navigate(['/heroes']);
        this.autoLogIn();
    }
    autoLogIn(): void {
        const activeUser: UserInfo = JSON.parse(
            localStorage.getItem('activeUser')!
        );
        if (!activeUser) {
            return;
        }

        const loadedUser: UserInfo = new UserInfo(
            activeUser.username,
            activeUser.email,
            activeUser.password,
            activeUser.id,
            new Date().getTime(),
            activeUser.expToken
        );
        const expTime = loadedUser.expToken! - loadedUser.startToken!;
        if (expTime > 0) {
            this.autoLogout(expTime);
            this.user.next(loadedUser);
        } else {
            this.logout();
        }
    }

    logout(): void {
        this.router.navigate(['/log-in']);
        localStorage.removeItem('activeUser');
        this.user.next(null);
    }

    autoLogout(expirationDuration: number): void {
        setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }
    checkIfUserExists(email: string): UserInfo | undefined {
        for (let i = 0; i < localStorage.length; i++) {
            if (
                email ===
                JSON.parse(localStorage.getItem(localStorage.key(i)!)!).email
            ) {
                return JSON.parse(localStorage.getItem(localStorage.key(i)!)!);
            }
        }
        return;
    }
}
