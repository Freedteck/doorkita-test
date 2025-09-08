import { Component } from '@angular/core';
import { DoctorHeaderComponent } from '../../components/doctor-header/doctor-header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-doctor-layout',
  imports: [DoctorHeaderComponent, SidebarComponent, RouterOutlet],
  templateUrl: './doctor-layout.component.html',
  styleUrl: './doctor-layout.component.scss',
})
export class DoctorLayoutComponent {}
