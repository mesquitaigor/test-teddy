import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly userIdentifiedKey = 'userIdentified';
  readonly user$ = new BehaviorSubject<string | null>(null);
  constructor() {
    const user = localStorage.getItem(this.userIdentifiedKey);
    if (user) {
      this.user$.next(JSON.parse(user));
    } else {
      this.user$.next(null);
    }
  }
  userIsIdentified(): boolean {
    return typeof JSON.parse(localStorage.getItem(this.userIdentifiedKey) || 'false') === 'string';
  }
  forgetUser(): void {
    localStorage.removeItem(this.userIdentifiedKey);
    this.user$.next(null);
  }
  identifyUser(user: string): void {
    localStorage.setItem(this.userIdentifiedKey, JSON.stringify(user));
    this.user$.next(user);
  }
}
