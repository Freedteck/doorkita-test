import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PatientHeaderComponent } from '../../components/patient-header/patient-header.component';

@Component({
  selector: 'app-patient-layout',
  imports: [RouterOutlet, PatientHeaderComponent],
  templateUrl: './patient-layout.component.html',
  styleUrl: './patient-layout.component.scss'
})
export class PatientLayoutComponent {

}