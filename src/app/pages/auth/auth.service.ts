import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, tap } from 'rxjs';
import { IAccessData } from './interfaces/access-data';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ILogin } from './interfaces/login';
import { IRegister } from './interfaces/register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelper: JwtHelperService = new JwtHelperService();
  apiUrl: string = 'http://localhost:3000/';
  registerUrl: string = this.apiUrl + 'register';
  loginUrl: string = this.apiUrl + 'login';

  autoLogoutTimer: any;

  private authSubject = new BehaviorSubject<null | IAccessData>(null);
  user$ = this.authSubject.asObservable();
  isLoggedIn$ = this.user$.pipe(map((user) => !!user));

  constructor(private http: HttpClient, private router: Router) {}

  // Funzioni per la registrazione
  //Registrazione
  register(data: IRegister) {
    console.log(data);
    return this.http.post<IAccessData>(this.registerUrl, data);
  }

  // Funzioni per il login
  //Login
  login(data: ILogin) {
    return this.http.post<IAccessData>(this.loginUrl, data).pipe(
      tap((data) => {
        this.authSubject.next(data);
        localStorage.setItem('token', JSON.stringify(data));

        const exp = this.jwtHelper.getTokenExpirationDate(data.JWT) as Date;
        this.autoLogout(exp);
      })
    );
  }

  //AutoLogout
  autoLogout(exp: Date) {
    const expInMs = exp.getTime() - new Date().getTime();
    this.autoLogoutTimer = setTimeout(() => {
      this.logout();
    }, expInMs);
  }

  //Logout
  logout() {
    this.authSubject.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
