import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Status } from 'src/app/core/models/Status';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'https://8fa40594-b757-4c24-827d-cf9c87ccac61.mock.pstmn.io';

  constructor(private http: HttpClient) {}

  login(user: string, password: string): Observable<Status> {
    let params = new HttpParams();
    params = params.append('user', user);
    params = params.append('password', password);
    return this.http.get<Status>(`${this.url}/login`, { params: params });
  }

  get isAuthenticated(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }
}
