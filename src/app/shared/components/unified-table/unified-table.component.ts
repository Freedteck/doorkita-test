import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { 
  LucideAngularModule, 
  Eye, 
  FileText, 
  Clock, 
  CheckCircle, 
  User, 
  Stethoscope,
  Edit,
  MoreHorizontal
} from 'lucide-angular';

@Component({
  selector: 'app-unified-table',
  imports: [
    LucideAngularModule, 
    DatePipe, 
    MatMenuModule, 
    MatIconModule
  ],
  templateUrl: './unified-table.component.html',
  styleUrl: './unified-table.component.scss'
})
export class UnifiedTableComponent {
  @Input() orders!: any[];
  @Input() isPatientView = false;
  @Input() showPatientName = true;
  @Input() showDoctorName = true;
  @Input() emptyStateMessage = 'No orders found.';

  @Output() viewOrder = new EventEmitter<any>();
  @Output() editOrder = new EventEmitter<any>();
  @Output() deleteOrder = new EventEmitter<any>();
  @Output() markCompleted = new EventEmitter<any>();

  readonly EyeIcon = Eye;
  readonly FileTextIcon = FileText;
  readonly ClockIcon = Clock;
  readonly CheckCircleIcon = CheckCircle;
  readonly UserIcon = User;
  readonly StethoscopeIcon = Stethoscope;
  readonly EditIcon = Edit;
  readonly MoreIcon = MoreHorizontal;

  onViewOrder(order: any): void {
    this.viewOrder.emit(order);
  }

  onEditOrder(order: any): void {
    this.editOrder.emit(order);
  }

  onDeleteOrder(order: any): void {
    this.deleteOrder.emit(order);
  }

  onMarkCompleted(order: any): void {
    this.markCompleted.emit(order);
  }
}