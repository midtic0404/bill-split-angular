import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BillSplitService } from '../../services/bill-split.service';
import { Person } from '../../models/app.models';

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './people-list.component.html',
  styleUrl: './people-list.component.css',
})
export class PeopleListComponent {
  newPersonName = '';
  people: Person[] = [];

  constructor(private billSplitService: BillSplitService) {
    this.billSplitService.people$.subscribe((people) => {
      this.people = people;
    });
  }

  addPerson(): void {
    if (this.billSplitService.addPerson(this.newPersonName)) {
      this.newPersonName = '';
    }
  }

  removePerson(personId: string, personName: string): void {
    if (confirm(`Remove ${personName}?`)) {
      this.billSplitService.removePerson(personId);
    }
  }
}
