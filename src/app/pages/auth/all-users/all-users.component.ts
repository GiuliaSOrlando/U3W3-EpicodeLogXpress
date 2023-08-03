import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { IAccessData } from '../interfaces/access-data';
import { IUser } from '../interfaces/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss'],
})
export class AllUsersComponent {
  users: IUser[] = [];
  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.fetchAllUsers().subscribe(
      (users) => {
        this.users = users;
        console.log(this.users);
      },
      (error) => {
        console.log('Error fetching users:', error);
      }
    );
  }

  fetchAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>('http://localhost:3000/users');
  }
}
