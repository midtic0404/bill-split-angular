import { Component } from '@angular/core';

import { BillSplitService } from '../../services/bill-split.service';
import { SplitResults } from '../../models/app.models';

@Component({
  selector: 'app-calculate',
  standalone: true,
  imports: [],
  templateUrl: './calculate.component.html',
  styleUrl: './calculate.component.css',
})
export class CalculateComponent {
  results: SplitResults | null = null;
  error: string | null = null;

  constructor(private billSplitService: BillSplitService) {}

  calculateSplit(): void {
    this.error = null;
    this.results = null;

    const calculatedResults = this.billSplitService.calculateSplit();

    if (!calculatedResults) {
      this.error = 'Need at least one person and one expense';
    } else {
      this.results = calculatedResults;
    }
  }

  getPersonTotalsArray(): Array<{ name: string; total: number }> {
    if (!this.results) return [];

    return Object.entries(this.results.person_totals).map(([name, total]) => ({
      name,
      total,
    }));
  }
}
