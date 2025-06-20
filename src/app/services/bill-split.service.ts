import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Person, Expense, SplitResults, AppData } from '../models/app.models';

@Injectable({
  providedIn: 'root',
})
export class BillSplitService {
  private readonly STORAGE_KEY = 'billSplitterData';

  private peopleSubject = new BehaviorSubject<Person[]>([]);
  private expensesSubject = new BehaviorSubject<Expense[]>([]);

  public people$ = this.peopleSubject.asObservable();
  public expenses$ = this.expensesSubject.asObservable();

  constructor() {
    this.loadFromStorage();
  }

  // People management
  addPerson(name: string): boolean {
    const trimmedName = name.trim();
    if (
      !trimmedName ||
      this.peopleSubject.value.some((p) => p.name === trimmedName)
    ) {
      return false;
    }

    const person: Person = {
      id: uuidv4(),
      name: trimmedName,
    };

    const updatedPeople = [...this.peopleSubject.value, person];
    this.peopleSubject.next(updatedPeople);
    this.saveToStorage();
    return true;
  }

  removePerson(personId: string): void {
    // Find the person to get their name before removing
    const personToRemove = this.peopleSubject.value.find(
      (p) => p.id === personId
    );

    if (personToRemove) {
      // Remove the person from people array
      const updatedPeople = this.peopleSubject.value.filter(
        (p) => p.id !== personId
      );

      // Remove all expenses associated with this person
      const updatedExpenses = this.expensesSubject.value.filter(
        (e) => e.for_person !== personToRemove.name
      );

      // Update both subjects
      this.peopleSubject.next(updatedPeople);
      this.expensesSubject.next(updatedExpenses);
      this.saveToStorage();
    }
  }

  getPeople(): Person[] {
    return this.peopleSubject.value;
  }

  // Expense management
  addExpense(
    description: string,
    amount: number,
    quantity: number,
    forPerson: string
  ): boolean {
    if (
      !description.trim() ||
      amount <= 0 ||
      quantity <= 0 ||
      !forPerson.trim()
    ) {
      return false;
    }

    const expense: Expense = {
      id: uuidv4(),
      description: description.trim(),
      amount: Number(amount),
      quantity: Number(quantity),
      for_person: forPerson,
      date: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const updatedExpenses = [...this.expensesSubject.value, expense];
    this.expensesSubject.next(updatedExpenses);
    this.saveToStorage();
    return true;
  }

  removeExpense(expenseId: string): void {
    const updatedExpenses = this.expensesSubject.value.filter(
      (e) => e.id !== expenseId
    );
    this.expensesSubject.next(updatedExpenses);
    this.saveToStorage();
  }

  getExpenses(): Expense[] {
    return this.expensesSubject.value;
  }

  getExpensesForPerson(personName: string): Expense[] {
    return this.expensesSubject.value.filter(
      (e) => e.for_person === personName
    );
  }

  // Helper method to calculate total amount for an expense (amount * quantity)
  getExpenseTotal(expense: Expense): number {
    return expense.amount * expense.quantity;
  }

  // Calculation
  calculateSplit(): SplitResults | null {
    const people = this.peopleSubject.value;
    const expenses = this.expensesSubject.value;

    if (people.length === 0 || expenses.length === 0) {
      return null;
    }

    const totalAmount = expenses.reduce(
      (sum, expense) => sum + this.getExpenseTotal(expense),
      0
    );
    const personTotals: { [name: string]: number } = {};

    // Initialize all people with 0
    people.forEach((person) => {
      personTotals[person.name] = 0;
    });

    // Calculate individual totals (amount * quantity for each expense)
    expenses.forEach((expense) => {
      personTotals[expense.for_person] += this.getExpenseTotal(expense);
    });

    // Round to 2 decimal places
    Object.keys(personTotals).forEach((name) => {
      personTotals[name] = Math.round(personTotals[name] * 100) / 100;
    });

    return {
      total_amount: Math.round(totalAmount * 100) / 100,
      person_totals: personTotals,
    };
  }

  // Clear all data
  clearAll(): void {
    this.peopleSubject.next([]);
    this.expensesSubject.next([]);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // Storage management
  private saveToStorage(): void {
    const data: AppData = {
      people: this.peopleSubject.value,
      expenses: this.expensesSubject.value,
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  private loadFromStorage(): void {
    try {
      const savedData = localStorage.getItem(this.STORAGE_KEY);

      if (savedData) {
        const data: AppData = JSON.parse(savedData);

        if (data.people && Array.isArray(data.people)) {
          this.peopleSubject.next(data.people);
        }

        if (data.expenses && Array.isArray(data.expenses)) {
          // Handle legacy data that might not have quantity field
          const expensesWithQuantity = data.expenses.map((expense) => ({
            ...expense,
            quantity: expense.quantity || 1, // Default to 1 if quantity is missing
          }));
          this.expensesSubject.next(expensesWithQuantity);
        }
      }
    } catch (error) {
      // Reset to empty arrays if there's an error
      this.peopleSubject.next([]);
      this.expensesSubject.next([]);
    }
  }
}
