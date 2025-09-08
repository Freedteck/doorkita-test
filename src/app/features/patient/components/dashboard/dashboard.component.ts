import { Component, inject, OnInit } from '@angular/core';
import { LucideAngularModule, FileText, Clock, CheckCircle } from 'lucide-angular';
import { AuthService, User } from '../../../auth/services/auth.service';
import { OrderService } from '../../../doctor/services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewOrderModalComponent } from '../../../../shared/modals/view-order-modal/view-order-modal.component';
import { SearchFilterComponent, FilterData } from '../../../../shared/components/search-filter/search-filter.component';
import { UnifiedTableComponent } from '../../../../shared/components/unified-table/unified-table.component';
import { StatsCardsComponent, StatCard } from '../../../../shared/components/stats-cards/stats-cards.component';
import { StateDisplayComponent } from '../../../../shared/components/state-display/state-display.component';

@Component({
  selector: 'app-patient-dashboard',
  imports: [
    LucideAngularModule,
    SearchFilterComponent,
    UnifiedTableComponent,
    StatsCardsComponent,
    StateDisplayComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class PatientDashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private orderService = inject(OrderService);
  private dialog = inject(MatDialog);

  readonly FileTextIcon = FileText;
  readonly ClockIcon = Clock;
  readonly CheckCircleIcon = CheckCircle;

  currentUser: User | null = null;
  orders: any[] = [];
  filteredOrders: any[] = [];
  testTypes: any[] = [];
  
  loading = false;
  error: string | null = null;
  
  searchQuery = '';
  selectedStatus = 'all';
  selectedTestType = 'all';

  get statsCards(): StatCard[] {
    return [
      {
        id: 'total',
        label: 'Total Orders',
        value: this.totalOrders,
        icon: this.FileTextIcon,
        type: 'default'
      },
      {
        id: 'pending',
        label: 'Pending Results',
        value: this.pendingOrders,
        icon: this.ClockIcon,
        type: 'pending'
      },
      {
        id: 'completed',
        label: 'Completed',
        value: this.completedOrders,
        icon: this.CheckCircleIcon,
        type: 'completed'
      }
    ];
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadOrders();
    this.loadTestTypes();
  }

  loadOrders(): void {
    if (!this.currentUser) {
      this.error = 'User not authenticated';
      return;
    }

    this.loading = true;
    this.error = null;

    // Use the proper patient endpoint
    this.orderService.getOrdersByPatient(this.currentUser.id).subscribe({
      next: (orders) => {
        this.orders = orders;
        this.filteredOrders = [...this.orders];
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.error = 'Failed to load your orders. Please try again.';
        console.error('Error loading orders:', error);
      }
    });
  }

  loadTestTypes(): void {
    this.orderService.getTestTypes().subscribe({
      next: (testTypes) => {
        this.testTypes = testTypes;
      },
      error: (error) => {
        console.error('Error loading test types:', error);
      }
    });
  }

  onFilterChange(filterData: FilterData): void {
    this.searchQuery = filterData.searchQuery;
    this.selectedStatus = filterData.selectedStatus;
    this.selectedTestType = filterData.selectedTestType;
    this.filterOrders();
  }

  private filterOrders(): void {
    this.filteredOrders = this.orders.filter(order => {
      const matchesSearch = !this.searchQuery ||
        order.testType?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        order.orderDate?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        order.doctorName?.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesStatus = this.selectedStatus === 'all' ||
        order.status?.toLowerCase() === this.selectedStatus;

      const matchesTestType = this.selectedTestType === 'all' ||
        order.testType === this.selectedTestType;

      return matchesSearch && matchesStatus && matchesTestType;
    });
  }

  viewOrder(order: any): void {
    this.dialog.open(ViewOrderModalComponent, {
      width: '600px',
      data: order
    });
  }

  get totalOrders(): number {
    return this.orders.length;
  }

  get pendingOrders(): number {
    return this.orders.filter(order => 
      order.status?.toLowerCase() === 'pending'
    ).length;
  }

  get completedOrders(): number {
    return this.orders.filter(order => 
      order.status?.toLowerCase() === 'completed'
    ).length;
  }
}