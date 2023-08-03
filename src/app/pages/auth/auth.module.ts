import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { HttpClientModule } from '@angular/common/http';
import { AllUsersComponent } from './all-users/all-users.component';

@NgModule({
  declarations: [AuthComponent, AllUsersComponent],
  imports: [CommonModule, AuthRoutingModule, HttpClientModule],
})
export class AuthModule {}
