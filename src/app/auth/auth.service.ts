import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from '../models/userInfo.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}
  user = new BehaviorSubject<any>(null);
  tokenExpirationTimer: any;

  singUp(user: UserInfo): void {
    localStorage.setItem(user.username, JSON.stringify(user));
    console.log('asd');
  }

  logIn(user: UserInfo): void {
    localStorage.setItem('activeUser', JSON.stringify(user)); //create special key in LS for logged in user
    this.autoLogIn();
    this.router.navigate(['/heroes']);
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

  logout() {
    this.router.navigate(['/log-in']);
    localStorage.removeItem('activeUser');
    this.user.next(null);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
