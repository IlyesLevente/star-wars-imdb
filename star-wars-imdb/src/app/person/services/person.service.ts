import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Film } from 'src/app/core/models/Film';
import { Person } from 'src/app/core/models/Person';
import { SearchPeople } from 'src/app/core/models/SearchPeople';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private url = 'https://swapi.dev/api/people';

  constructor(private http: HttpClient) {}

  getPeople(page: number): Observable<SearchPeople> {
    return this.http.get<SearchPeople>(`${this.url}/?page=${page}`).pipe(
      map((data: SearchPeople) => {
        return this.setId(data);
      })
    );
  }

  getPerson(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.url}/${id}`);
  }

  getFilm(film: string): Observable<Film> {
    return this.http.get<Film>(`${film}`);
  }

  setId(data: SearchPeople): SearchPeople {
    data.results.forEach(result => {
      result.id = Number(result.url.split(/\//)[5]);
    });
    return data;
  }
}
