import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRoutingModule, FormsModule],
})
export class LoginModule {
  username!: string;
  password!: string;

  onSubmit() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  }
}
