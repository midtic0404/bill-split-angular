import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillSplitService } from './services/bill-split.service';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { CalculateComponent } from './components/calculate/calculate.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    PeopleListComponent,
    ExpensesComponent,
    CalculateComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  activeTab: 'people' | 'expenses' | 'calculate' = 'people';

  constructor(private billSplitService: BillSplitService) {}

  getTabButtonClass(tab: string): string {
    return this.activeTab === tab
      ? 'bg-white text-slate-900 shadow-sm'
      : 'text-slate-500 hover:text-slate-700';
  }

  onPeopleChanged(): void {
    // This can be used to trigger updates in other components if needed
  }

  clearAll(): void {
    if (
      confirm(
        'Are you sure you want to clear all data? This will remove all people and expenses permanently.'
      )
    ) {
      this.billSplitService.clearAll();
    }
  }
}
