import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BillSplitService } from '../../services/bill-split.service';
import { Person } from '../../models/app.models';

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './people-list.component.html',
  styleUrl: './people-list.component.css',
})
export class PeopleListComponent {
  @Output() peopleChanged = new EventEmitter<void>();

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
      this.peopleChanged.emit();
    }
  }

  removePerson(personId: string, personName: string): void {
    if (confirm(`Remove ${personName}?`)) {
      this.billSplitService.removePerson(personId);
      this.peopleChanged.emit();
    }
  }
}
