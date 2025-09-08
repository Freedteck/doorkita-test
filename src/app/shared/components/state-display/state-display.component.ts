import { Component, Input } from '@angular/core';
import { LucideAngularModule, Loader2, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-angular';

export type StateType = 'loading' | 'error' | 'success' | 'warning' | 'empty';

@Component({
  selector: 'app-state-display',
  imports: [LucideAngularModule],
  templateUrl: './state-display.component.html',
  styleUrl: './state-display.component.scss'
})
export class StateDisplayComponent {
  @Input() type: StateType = 'loading';
  @Input() title = '';
  @Input() message = '';
  @Input() showRetry = false;
  @Input() retryText = 'Try Again';

  readonly LoaderIcon = Loader2;
  readonly ErrorIcon = AlertCircle;
  readonly SuccessIcon = CheckCircle;
  readonly WarningIcon = AlertTriangle;

  get icon() {
    switch (this.type) {
      case 'loading':
        return this.LoaderIcon;
      case 'error':
        return this.ErrorIcon;
      case 'success':
        return this.SuccessIcon;
      case 'warning':
        return this.WarningIcon;
      default:
        return this.ErrorIcon;
    }
  }

  get defaultTitle() {
    switch (this.type) {
      case 'loading':
        return 'Loading...';
      case 'error':
        return 'Something went wrong';
      case 'success':
        return 'Success!';
      case 'warning':
        return 'Warning';
      case 'empty':
        return 'No data found';
      default:
        return '';
    }
  }

  get defaultMessage() {
    switch (this.type) {
      case 'loading':
        return 'Please wait while we load your data.';
      case 'error':
        return 'An error occurred. Please try again.';
      case 'success':
        return 'Operation completed successfully.';
      case 'warning':
        return 'Please review the information below.';
      case 'empty':
        return 'No items match your current criteria.';
      default:
        return '';
    }
  }

  onRetry() {
    // This will be handled by parent component
  }
}