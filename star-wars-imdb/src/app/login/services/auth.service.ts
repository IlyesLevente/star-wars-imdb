import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Status } from 'src/app/core/models/Status';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'https://8fa40594-b757-4c24-827d-cf9c87ccac61.mock.pstmn.io';

  constructor(private http: HttpClient) {}

  login(): Observable<Status> {
    return this.http.get<Status>(`${this.url}/login`);
  }

  get isAuthenticated(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }
}
