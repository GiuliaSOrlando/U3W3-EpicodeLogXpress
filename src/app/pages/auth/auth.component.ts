import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { IUser } from './interfaces/user';
import { HttpClient } from '@angular/common/http';
import { IAccessData } from './interfaces/access-data';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  users!: IUser;
  accessData!: IAccessData;
  userId!: number;
  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.extractUserIdFromLocalStorage();
    this.getUsersData().subscribe((data) => (this.users = data));
  }

  extractUserIdFromLocalStorage() {
    const userDataJSON = localStorage.getItem('token');

    if (userDataJSON !== null) {
      const userData = JSON.parse(userDataJSON) as IAccessData;
      this.userId = userData.user?.['id'] as number;
      console.log(this.userId);
    } else {
      console.log('Data not found in localStorage.');
    }
  }

  getUsersData(): Observable<IUser> {
    return this.http.get<IUser>(`http://localhost:3000/users/${this.userId}`);
  }
}
