import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  X,
  CircleCheck,
  CircleAlert,
  TriangleAlert,
} from 'lucide-angular';
import {
  NotificationService,
  Notification,
} from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent implements OnInit {
  private notificationService = inject(NotificationService);

  readonly CheckCircleIcon = CircleCheck;
  readonly AlertCircleIcon = CircleAlert;
  readonly AlertTriangleIcon = TriangleAlert;
  readonly InfoIcon = Info;
  readonly CloseIcon = X;

  notifications: Notification[] = [];

  ngOnInit() {
    this.notificationService.notifications.subscribe((notifications) => {
      this.notifications = notifications;
    });
  }

  getIcon(type: string) {
    switch (type) {
      case 'success':
        return this.CheckCircleIcon;
      case 'error':
        return this.AlertCircleIcon;
      case 'warning':
        return this.AlertTriangleIcon;
      default:
        return this.InfoIcon;
    }
  }

  close(id: string) {
    this.notificationService.remove(id);
  }
}
