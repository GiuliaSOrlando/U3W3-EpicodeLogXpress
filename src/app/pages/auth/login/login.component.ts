import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ILogin } from '../interfaces/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formData: ILogin = {
    email: '',
    password: '',
  };
  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.formData).subscribe((data) => {
      console.log(data);
    });
  }
}
