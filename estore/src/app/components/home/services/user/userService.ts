import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggedInUser, LoginToken, User } from '../../types/user.type';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable()
export class UserService {
  private isAuthenticated = signal<boolean>(false);
  private loggedInUserInfo = signal<LoggedInUser>({} as LoggedInUser);

  constructor(private http: HttpClient) { }

  get isUserAuthenticated(): boolean {
    return this.isAuthenticated();
  }

  get isUserAuthenticated$(): Observable<boolean> {
    return toObservable(this.isAuthenticated);
  }

  get loggedInUser$(): Observable<LoggedInUser> {
    return toObservable(this.loggedInUserInfo);
  }

  createUser(user: User): Observable<any> {
    const url: string = 'http://localhost:5001/users/signup';
    return this.http.post(url, user)
  }

  login(email: string, password: string): Observable<any> {
    const url: string = 'http://localhost:5001/users/login';
    return this.http.post(url, {email: email, password: password})
  }


  activateToken(token: LoginToken): void {
    localStorage.setItem('token', token.token);
    localStorage.setItem('expiry', new Date(Date.now() + token.expiresInSeconds * 1000).toISOString());

    localStorage.setItem('firstName', token.user.firstName);
    localStorage.setItem('lastName', token.user.lastName);
    localStorage.setItem('address', token.user.address);
    localStorage.setItem('city', token.user.city);
    localStorage.setItem('state', token.user.state);
    localStorage.setItem('pin', token.user.pin);

    this.isAuthenticated.set(true);
    this.loggedInUserInfo.set(token.user);
  }

}
