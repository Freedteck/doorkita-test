import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule, User, LogOut } from 'lucide-angular';
import { AuthService, User as UserType } from '../../../features/auth/services/auth.service';

@Component({
  selector: 'app-patient-header',
  imports: [LucideAngularModule],
  templateUrl: './patient-header.component.html',
  styleUrl: './patient-header.component.scss'
})
export class PatientHeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  readonly UserIcon = User;
  readonly LogOutIcon = LogOut;

  currentUser: UserType | null = null;

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}