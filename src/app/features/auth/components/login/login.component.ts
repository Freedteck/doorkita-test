import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LucideAngularModule, Stethoscope, User } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    LucideAngularModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  readonly StethoscopeIcon = Stethoscope;
  readonly UserIcon = User;

  loginForm: FormGroup;
  hidePassword = true;
  loading = false;
  error: string | null = null;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.error = null;

      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (user) => {
          this.loading = false;
          this.redirectUser(user.role);
        },
        error: (error) => {
          this.loading = false;
          this.error = error.message || 'Login failed. Please try again.';
          setTimeout(() => {
            this.error = null;
          }, 1000);
        },
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  loginAsDemo(role: 'doctor' | 'patient'): void {
    this.loading = true;
    this.error = null;

    const demoCredentials = {
      doctor: {
        email: 'sarah.wilson@doorkita.com',
        password: 'doctor123',
      },
      patient: {
        email: 'jane.smith@email.com',
        password: 'patient123',
      },
    };

    const { email, password } = demoCredentials[role];

    this.authService.login(email, password).subscribe({
      next: (user) => {
        this.loading = false;
        this.redirectUser(user.role);
      },
      error: (error) => {
        this.loading = false;
        this.error = error.message || 'Demo login failed. Please try again.';
      },
    });
  }

  private redirectUser(role: string): void {
    if (role === 'doctor') {
      this.router.navigate(['/doctor']);
    } else if (role === 'patient') {
      this.router.navigate(['/patient']);
    } else {
      this.router.navigate(['/']);
    }
  }

  getFieldError(fieldName: string): string {
    const control = this.loginForm.get(fieldName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} is required`;
      }
      if (control.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (control.errors['minlength']) {
        return `${this.getFieldDisplayName(fieldName)} must be at least ${
          control.errors['minlength'].requiredLength
        } characters`;
      }
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      email: 'Email',
      password: 'Password',
    };
    return displayNames[fieldName] || fieldName;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach((key) => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }
}
