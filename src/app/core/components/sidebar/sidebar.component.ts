import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  ChartColumn,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  tabs = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      route: 'dashboard',
    },
    {
      label: 'Orders',
      icon: FileText,
      route: 'orders',
    },
    {
      label: 'Patients',
      icon: Users,
      route: 'patients',
    },
    {
      label: 'Reports',
      icon: ChartColumn,
      route: 'reports',
    },
    {
      label: 'Settings',
      icon: Settings,
      route: 'settings',
    },
  ];
}
