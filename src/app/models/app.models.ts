export interface Person {
  id: string;
  name: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  quantity: number;
  for_person: string;
  date: string;
}

export interface SplitResults {
  total_amount: number;
  person_totals: { [name: string]: number };
}

export interface AppData {
  people: Person[];
  expenses: Expense[];
}
