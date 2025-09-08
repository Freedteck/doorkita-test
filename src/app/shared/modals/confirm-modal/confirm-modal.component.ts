import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { LucideAngularModule, AlertTriangle, X } from 'lucide-angular';

export interface ConfirmModalData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'danger' | 'info';
}

@Component({
  selector: 'app-confirm-modal',
  imports: [MatDialogModule, LucideAngularModule],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmModalComponent>);
  readonly data = inject<ConfirmModalData>(MAT_DIALOG_DATA);

  readonly AlertIcon = AlertTriangle;
  readonly CloseIcon = X;

  get confirmText(): string {
    return this.data.confirmText || 'Yes, Continue';
  }

  get cancelText(): string {
    return this.data.cancelText || 'Cancel';
  }

  get modalType(): string {
    return this.data.type || 'warning';
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}