import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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

  setId(data: SearchPeople): SearchPeople {
    data.results.forEach(result => {
      result.id = Number(result.url.split(/\//)[5]);
    });
    return data;
  }
}
