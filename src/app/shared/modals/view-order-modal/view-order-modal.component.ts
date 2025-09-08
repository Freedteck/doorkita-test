import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  Calendar,
  ClipboardList,
  FileText,
  Stethoscope,
  User,
  X,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-view-order-modal',
  imports: [LucideAngularModule, DatePipe],
  templateUrl: './view-order-modal.component.html',
  styleUrl: './view-order-modal.component.scss',
})
export class ViewOrderModalComponent {
  readonly dialogRef = inject(MatDialogRef<ViewOrderModalComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  readonly CloseIcon = X;
  readonly UserIcon = User;
  readonly CalendarIcon = Calendar;
  readonly FileTextIcon = FileText;
  readonly StethoscopeIcon = Stethoscope;
  readonly ClipboardIcon = ClipboardList;

  close(): void {
    this.dialogRef.close();
  }

  getStatusColor(): string {
    return this.data.status === 'COMPLETED' ? 'completed' : 'pending';
  }
}
