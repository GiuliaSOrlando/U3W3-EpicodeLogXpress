import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        name: this.fb.control(null, [Validators.required]),
        surname: this.fb.control(null, [Validators.required]),
        username: ['', [Validators.required, Validators.minLength(5)]],
        sexes: this.fb.control(null, [Validators.required]),
        profileImage: [null],
        biography: ['', Validators.maxLength(500)],
        email: this.fb.control(null, [Validators.required, Validators.email]),
        password: this.fb.control(null, [
          Validators.required,
          Validators.minLength(6),
        ]),
        'confirm-password': this.fb.control(null, [Validators.required]),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  sexes: string[] = ['Male', 'Female', 'Other'];
  selectedSex!: string;

  isValid(fieldName: string) {
    return this.form.get(fieldName)?.valid;
  }

  isTouched(fieldName: string) {
    return this.form.get(fieldName)?.touched;
  }

  passwordMatchValidator(formGroup: FormGroup): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirm-password')?.value;
    if (password === confirmPassword) {
      return null;
    } else {
      return { passwordMismatch: true };
    }
  }

  onProfileImageChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement?.files?.length) {
      const file = inputElement.files[0];
      this.form.patchValue({ profileImage: file });
      this.form.get('profileImage')?.updateValueAndValidity();
    }
  }

  register() {
    if (this.form.valid) {
      this.authService.register(this.form.value).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/auth']);
        },
        (error) => {
          console.log('Error during registration:', error);
        }
      );
    } else {
      console.log('Invalid form! Please check the fields.');
    }
  }
}
