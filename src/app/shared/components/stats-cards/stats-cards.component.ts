import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

export interface StatCard {
  id: string;
  label: string;
  value: number;
  icon: any;
  type?: 'default' | 'pending' | 'completed';
}

@Component({
  selector: 'app-stats-cards',
  imports: [LucideAngularModule],
  templateUrl: './stats-cards.component.html',
  styleUrl: './stats-cards.component.scss'
})
export class StatsCardsComponent {
  @Input() stats: StatCard[] = [];
}