import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [];

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class RegisterModule {}
