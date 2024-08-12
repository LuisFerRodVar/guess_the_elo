import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  _id?: string;
  name: string;
  score: number;
}

export interface Game {
  _id: number;
  gameId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://api-guess-the-elo.shuttleapp.rs';

  constructor(private http: HttpClient) {}

  getIp(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ip`);
  }

  getGame(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.baseUrl}/games/${id}`);
  }

  getMaxScores(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/max_scores`);
  }

  createUser(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/user`, user, { headers });
  }
}

