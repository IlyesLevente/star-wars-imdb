import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Person } from '../core/models/Person';
import { SearchPeople } from '../core/models/SearchPeople';
import { PersonService } from './services/person.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Film } from '../core/models/Film';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {
  constructor(
    private personService: PersonService,
    private activatedRoute: ActivatedRoute,
    private responsive: BreakpointObserver
  ) {
    this.people = [];
    this.page = 1;
    this.results = 0;
    this.next = null;
    this.previous = null;
    this.person = {} as Person;
    this.isHandset = false;
    this.films = [];
    this.imageURL = './assets/images/placeholder.jpeg';
  }

  people: Person[];
  person: Person;
  page: number;
  results: number;
  next: string | null;
  previous: string | null;
  isHandset: boolean;
  imageURL: string;
  films: Film[];
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Person from resolver
    this.activatedRoute.data.subscribe((response: any) => {
      this.person = response.person;
      this.getFilms(this.person.films);
    });
    // number of persons, first page of persons
    this.getPeople();
    // check size for responiseveness
    this.responsive.observe(Breakpoints.HandsetPortrait).subscribe(result => {
      this.isHandset = false;
      if (result.matches) {
        this.isHandset = true;
      }
    });
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

  setResult(data: SearchPeople): void {
    this.people = data.results;
    this.results = data.count;
    this.previous = data.previous;
    this.next = data.next;
  }

  getFilms(films: string[]): void {
    films.forEach((film: string) => {
      this.personService
        .getFilm(film)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (film: Film) => {
            this.films.push(film);
          },
        });
    });
  }
}
