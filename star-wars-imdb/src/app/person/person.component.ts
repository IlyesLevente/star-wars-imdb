import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Person } from '../core/models/Person';
import { SearchPeople } from '../core/models/SearchPeople';
import { PersonService } from './services/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {
  constructor(private personService: PersonService) {
    this.people = [];
    this.page = 1;
    this.results = 0;
    this.next = 0;
    this.previous = 0;
    this.person = {} as Person;
  }

  people: Person[];
  person: Person;
  page: number;
  results: number;
  next: number;
  previous: number;
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.getPeople();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getPeople(): void {
    this.personService
      .getPeople(this.page)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: SearchPeople) => {
        this.setResult(data);
      });
  }

  setResult(data: SearchPeople) {
    this.people = data.results;
    this.person = this.people[0];
    this.results = data.count;
    this.previous =
      data.previous != null
        ? Number(data.previous.substr(data.previous.length - 1))
        : 0;
    this.next =
      data.next != null ? Number(data.next.substr(data.next.length - 1)) : 0;
  }

  decreasePage(): void {
    this.page--;
    this.getPeople();
  }

  increasePage(): void {
    this.page++;
    this.getPeople();
  }
}
