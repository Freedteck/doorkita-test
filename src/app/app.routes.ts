import { Routes } from '@angular/router';
import { DoctorLayoutComponent } from './core/layout/doctor-layout/doctor-layout.component';
import { PatientLayoutComponent } from './core/layout/patient-layout/patient-layout.component';
import { DashboardComponent } from './features/doctor/components/dashboard/dashboard.component';
import { PatientDashboardComponent } from './features/patient/components/dashboard/dashboard.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { authGuard, roleGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'doctor',
    component: DoctorLayoutComponent,
    canActivate: [authGuard, roleGuard(['doctor'])],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ]
  },
  {
    path: 'patient',
    component: PatientLayoutComponent,
    canActivate: [authGuard, roleGuard(['patient'])],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: PatientDashboardComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];