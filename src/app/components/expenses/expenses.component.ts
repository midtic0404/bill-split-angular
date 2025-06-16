import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BillSplitService } from '../../services/bill-split.service';
import { Person, Expense } from '../../models/app.models';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css',
})
export class ExpensesComponent {
  showClassicView = false;
  selectedPerson: string | null = null;
  people: Person[] = [];
  expenses: Expense[] = [];

  newPersonExpense = {
    description: '',
    amount: 0,
    quantity: 1,
  };

  newClassicExpense = {
    description: '',
    amount: 0,
    quantity: 1,
    forPerson: '',
  };

  constructor(private billSplitService: BillSplitService) {
    this.billSplitService.people$.subscribe((people) => {
      this.people = people;
    });

    this.billSplitService.expenses$.subscribe((expenses) => {
      this.expenses = expenses;
    });
  }

  getToggleButtonClass(isClassic: boolean): string {
    const isActive = isClassic === this.showClassicView;
    return isActive ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500';
  }

  selectPersonForExpenses(personName: string): void {
    this.selectedPerson = personName;
  }

  addPersonExpense(): void {
    if (
      this.selectedPerson &&
      this.billSplitService.addExpense(
        this.newPersonExpense.description,
        this.newPersonExpense.amount,
        this.newPersonExpense.quantity,
        this.selectedPerson
      )
    ) {
      this.newPersonExpense = { description: '', amount: 0, quantity: 1 };
    }
  }

  addClassicExpense(): void {
    if (
      this.billSplitService.addExpense(
        this.newClassicExpense.description,
        this.newClassicExpense.amount,
        this.newClassicExpense.quantity,
        this.newClassicExpense.forPerson
      )
    ) {
      this.newClassicExpense = {
        description: '',
        amount: 0,
        quantity: 1,
        forPerson: '',
      };
    }
  }

  removeExpense(expenseId: string): void {
    if (confirm('Remove this expense?')) {
      this.billSplitService.removeExpense(expenseId);
    }
  }

  getPersonExpenses(): Expense[] {
    return this.selectedPerson
      ? this.billSplitService.getExpensesForPerson(this.selectedPerson)
      : [];
  }

  getPersonTotal(): number {
    return this.getPersonExpenses().reduce(
      (sum, expense) => sum + this.getExpenseTotal(expense),
      0
    );
  }

  getTotalExpenses(): number {
    return this.expenses.reduce(
      (sum, expense) => sum + this.getExpenseTotal(expense),
      0
    );
  }

  getExpenseTotal(expense: Expense): number {
    return this.billSplitService.getExpenseTotal(expense);
  }
}
