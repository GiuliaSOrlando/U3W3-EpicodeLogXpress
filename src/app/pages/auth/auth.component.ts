import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { IUser } from './interfaces/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  users!: IUser;
  constructor(private authService: AuthService, private http: HttpClient) {}
  getUsersData(): Observable<IUser[]> {
    return this.http.get<IUser[]>('http://localhost:3000/api/users');
  }
}
