import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { LucideAngularModule, Search } from 'lucide-angular';

export interface FilterData {
  searchQuery: string;
  selectedStatus: string;
  selectedTestType: string;
}

@Component({
  selector: 'app-search-filter',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    LucideAngularModule
  ],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss'
})
export class SearchFilterComponent {
  @Input() searchPlaceholder = 'Search...';
  @Input() testTypes: any[] = [];
  @Input() searchQuery = '';
  @Input() selectedStatus = 'all';
  @Input() selectedTestType = 'all';
  
  @Output() filterChange = new EventEmitter<FilterData>();

  readonly SearchIcon = Search;

  onSearchChange(query: string): void {
    this.searchQuery = query;
    this.emitFilterChange();
  }

  onFilterChange(): void {
    this.emitFilterChange();
  }

  private emitFilterChange(): void {
    this.filterChange.emit({
      searchQuery: this.searchQuery,
      selectedStatus: this.selectedStatus,
      selectedTestType: this.selectedTestType
    });
  }
}