import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  Calendar,
  ClipboardList,
  FileText,
  Stethoscope,
  User,
  X,
  LucideAngularModule,
} from 'lucide-angular';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OrderService } from '../../../features/doctor/services/order.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-add-order-modal',
  providers: [provideNativeDateAdapter()],
  imports: [
    LucideAngularModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './add-order-modal.component.html',
  styleUrl: './add-order-modal.component.scss',
})
export class AddOrderModalComponent {
  readonly dialogRef = inject(MatDialogRef<AddOrderModalComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  orderService = inject(OrderService);
  notificationService = inject(NotificationService);

  orderForm: FormGroup = new FormGroup({});
  formBuilder: FormBuilder = inject(FormBuilder);

  readonly CloseIcon = X;
  readonly UserIcon = User;
  readonly FileTextIcon = FileText;
  readonly CalendarIcon = Calendar;
  readonly StethoscopeIcon = Stethoscope;
  readonly ClipboardIcon = ClipboardList;

  testTypes: any[] = [];
  doctors: any[] = [];
  isSubmitting = false;

  get isEditMode(): boolean {
    return !!this.data?.isEdit;
  }

  get modalTitle(): string {
    return this.isEditMode ? 'Edit Lab Order' : 'Create New Lab Order';
  }

  get submitButtonText(): string {
    return this.isEditMode ? 'Update Order' : 'Create Order';
  }

  initializeForm(): void {
    const today = new Date().toISOString().split('T')[0];

    if (this.isEditMode && this.data?.order) {
      const order = this.data.order;
      this.orderForm = this.formBuilder.group({
        patientName: [
          order.patientName,
          [Validators.required, Validators.minLength(2)],
        ],
        testType: [order.testType, Validators.required],
        doctorName: [order.doctorName || '', Validators.required],
        orderDate: [order.orderDate, Validators.required],
        notes: [order.notes || ''],
      });
    } else {
      this.orderForm = this.formBuilder.group({
        patientName: ['', [Validators.required, Validators.minLength(2)]],
        testType: ['', Validators.required],
        doctorName: ['', Validators.required],
        orderDate: [today, Validators.required],
        notes: [''],
      });
    }
  }

  addOrder(order: any): void {
    this.isSubmitting = true;
    this.orderService.createOrder(order).subscribe({
      next: (response) => {
        this.notificationService.success('Lab order created successfully');
        setTimeout(() => {
          this.isSubmitting = false;
          this.dialogRef.close(true);
        }, 1500);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.notificationService.error('Failed to create lab order');
        console.error('Error creating order:', error);
      },
    });
  }

  updateOrder(id: string, order: any): void {
    this.isSubmitting = true;
    this.orderService.updateOrder(id, order).subscribe({
      next: (response) => {
        this.notificationService.success('Lab order updated successfully');
        setTimeout(() => {
          this.isSubmitting = false;
          this.dialogRef.close(true);
        }, 1500);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.notificationService.error('Failed to update lab order');
        console.error('Error updating order:', error);
      },
    });
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const formValue = this.orderForm.value;
      const orderData = {
        ...formValue,
        id: this.isEditMode ? this.data.order.id : this.generateOrderId(),
        status: this.isEditMode ? this.data.order.status : 'PENDING',
      };
      if (this.isEditMode) {
        this.updateOrder(this.data.order.id, orderData);
      } else {
        this.addOrder(orderData);
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  private generateOrderId(): string {
    return Date.now().toString();
  }

  private markFormGroupTouched(): void {
    Object.keys(this.orderForm.controls).forEach((key) => {
      const control = this.orderForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const control = this.orderForm.get(fieldName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} is required`;
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
      patientName: 'Patient name',
      testType: 'Test type',
      doctorName: 'Doctor name',
      orderDate: 'Order date',
      notes: 'Notes',
    };
    return displayNames[fieldName] || fieldName;
  }

  close(): void {
    this.dialogRef.close();
  }

  getTestTypes(): void {
    this.orderService.getTestTypes().subscribe({
      next: (data) => {
        this.testTypes = data;
      },
      error: (error) => {
        console.error('Error fetching test types:', error);
      },
    });
  }

  getDoctors(): void {
    this.orderService.getDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
      },
      error: (error) => {
        console.error('Error fetching doctors:', error);
      },
    });
  }

  constructor() {
    this.initializeForm();
    this.getTestTypes();
    this.getDoctors();
  }
}
