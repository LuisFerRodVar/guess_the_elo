import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from './game';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://api-guess-the-elo.shuttleapp.rs';

  constructor(private http: HttpClient) { }

  getIp(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ip`);
  }

  getGame(id: number): Observable<Game> {

    return this.http.get<Game>(`${this.baseUrl}/games/${id}`);
  }

  getMaxScores(): Observable<User[]> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-store',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    return this.http.get<User[]>(`${this.baseUrl}/max_scores`, {headers});
  }

  createUser(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/user`, user, { headers });
  }
}

