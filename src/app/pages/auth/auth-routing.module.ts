import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AllUsersComponent } from './all-users/all-users.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'all-users',
    component: AllUsersComponent,
  },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
