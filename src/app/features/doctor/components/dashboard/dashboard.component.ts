import { Component, inject } from '@angular/core';
import {
  CheckCircle,
  Clock,
  FileText,
  LucideAngularModule,
  Plus,
} from 'lucide-angular';
import { MatDialog } from '@angular/material/dialog';
import { ViewOrderModalComponent } from '../../../../shared/modals/view-order-modal/view-order-modal.component';
import { AddOrderModalComponent } from '../../../../shared/modals/add-order-modal/add-order-modal.component';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../../auth/services/auth.service';
import { SearchFilterComponent, FilterData } from '../../../../shared/components/search-filter/search-filter.component';
import { UnifiedTableComponent } from '../../../../shared/components/unified-table/unified-table.component';
import { StatsCardsComponent, StatCard } from '../../../../shared/components/stats-cards/stats-cards.component';
import { StateDisplayComponent } from '../../../../shared/components/state-display/state-display.component';
import { NotificationService } from '../../../../shared/services/notification.service';
import { ConfirmModalComponent } from '../../../../shared/modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    LucideAngularModule,
    SearchFilterComponent,
    UnifiedTableComponent,
    StatsCardsComponent,
    StateDisplayComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  readonly FileIcon = FileText;
  readonly CheckIcon = CheckCircle;
  readonly ClockIcon = Clock;
  readonly PlusIcon = Plus;

  dialog = inject(MatDialog);
  orderService = inject(OrderService);
  authService = inject(AuthService);
  notificationService = inject(NotificationService);

  selectedStatus = 'all';
  selectedTestType = 'all';

  loading = false;
  error: string | null = null;
  buttonLoading = false;

  orders: any[] = [];
  testTypes: any[] = [];
  searchQuery = '';
  filteredOrders: any[] = [];
  allOrders: any[] = [];

  get statsCards(): StatCard[] {
    return [
      {
        id: 'total',
        label: 'Total Orders',
        value: this.totalOrders,
        icon: this.FileIcon,
        type: 'default'
      },
      {
        id: 'pending',
        label: 'Pending',
        value: this.pendingOrders,
        icon: this.ClockIcon,
        type: 'pending'
      },
      {
        id: 'completed',
        label: 'Completed',
        value: this.completedOrders,
        icon: this.CheckIcon,
        type: 'completed'
      }
    ];
  }

  loadTestTypes() {
    this.orderService.getTestTypes().subscribe({
      next: (data) => {
        this.testTypes = data;
      },
      error: (error) => {
        console.error('Error loading test types:', error);
      },
    });
  }

  getOrders() {
    this.loading = true;
    this.error = null;
    
    // Get current user to fetch their orders
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.loading = false;
      this.error = 'User not authenticated';
      return;
    }

    this.orderService.getOrdersByDoctor(currentUser.id).subscribe({
      next: (data) => {
        this.orders = data;
        this.allOrders = data;
        this.filteredOrders = data;

        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.error = 'Error fetching orders';
        console.error('Error fetching orders:', error);
      },
    });
  }

  onFilterChange(filterData: FilterData): void {
    this.searchQuery = filterData.searchQuery;
    this.selectedStatus = filterData.selectedStatus;
    this.selectedTestType = filterData.selectedTestType;
    this.filterOrders();
  }

  private filterOrders(): void {
    this.filteredOrders = this.allOrders.filter(order => {
      const matchesSearch = !this.searchQuery ||
        order.patientName?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        order.testType?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        order.orderDate?.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesStatus = this.selectedStatus === 'all' ||
        order.status?.toLowerCase() === this.selectedStatus;

      const matchesTestType = this.selectedTestType === 'all' ||
        order.testType === this.selectedTestType;

      return matchesSearch && matchesStatus && matchesTestType;
    });
  }

  viewOrder(order: any) {
    this.dialog
      .open(ViewOrderModalComponent, {
        width: '600px',
        data: order,
      })
      .afterClosed()
      .subscribe(() => {
        this.getOrders();
      });
  }

  editOrder(order: any) {
    this.dialog
      .open(AddOrderModalComponent, {
        width: '600px',
        data: {
          order,
          isEdit: true,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.getOrders();
        }
      });
  }

  addOrder() {
    this.buttonLoading = true;
    this.dialog
      .open(AddOrderModalComponent, {
        width: '600px',
        data: {
          isEdit: false,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        this.buttonLoading = false;
        if (result) {
          setTimeout(() => {
            this.getOrders();
          }, 1500);
        }
      });
  }

  deleteOrder(order: any) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '500px',
      data: {
        title: 'Delete Lab Order',
        message: `Are you sure you want to delete the lab order for ${order.patientName}? This action cannot be undone.`,
        confirmText: 'Yes, Delete',
        cancelText: 'Cancel',
        type: 'danger'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.buttonLoading = true;
        this.orderService.deleteOrder(order.id).subscribe({
          next: () => {
            this.notificationService.success('Lab order deleted successfully');
            setTimeout(() => {
              this.buttonLoading = false;
              this.getOrders();
            }, 1500);
          },
          error: (error) => {
            this.buttonLoading = false;
            this.notificationService.error('Failed to delete lab order');
            console.error('Error deleting order:', error);
          },
        });
      }
    });
  }

  markCompleted(order: any): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '500px',
      data: {
        title: 'Mark Order as Completed',
        message: `Are you sure you want to mark the lab order for ${order.patientName} as completed?`,
        confirmText: 'Yes, Mark Completed',
        cancelText: 'Cancel',
        type: 'info'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.buttonLoading = true;
        this.orderService.updateOrderStatus(order.id, 'COMPLETED').subscribe({
          next: () => {
            this.notificationService.success('Lab order marked as completed');
            setTimeout(() => {
              this.buttonLoading = false;
              this.getOrders();
            }, 1500);
          },
          error: (error) => {
            this.buttonLoading = false;
            this.notificationService.error('Failed to update order status');
            console.error('Error updating order status:', error);
          },
        });
      }
    });
  }

  get totalOrders(): number {
    return this.orders.length;
  }

  get pendingOrders(): number {
    return this.orders.filter(
      (order) => order.status?.toLowerCase() === 'pending'
    ).length;
  }

  get completedOrders(): number {
    return this.orders.filter(
      (order) => order.status?.toLowerCase() === 'completed'
    ).length;
  }

  constructor() {
    this.getOrders();
    this.loadTestTypes();
  }
}
