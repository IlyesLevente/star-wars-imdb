import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PersonService } from 'src/app/person/services/person.service';
import { Person } from '../models/Person';

@Injectable({
  providedIn: 'root',
})
export class PersonResolver implements Resolve<Person> {
  constructor(private personService: PersonService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Person> {
    return this.personService.getPerson(1);
  }
}
