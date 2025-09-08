import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogOut, LucideAngularModule, User } from 'lucide-angular';
import { AuthService, User as UserType } from '../../../features/auth/services/auth.service';

@Component({
  selector: 'app-doctor-header',
  imports: [LucideAngularModule],
  templateUrl: './doctor-header.component.html',
  styleUrl: './doctor-header.component.scss',
})
export class DoctorHeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  readonly UserIcon = User;
  readonly ExitIcon = LogOut;

  currentUser: UserType | null = null;

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
