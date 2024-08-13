import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiLichessService {
  private baseUrl = 'https://lichess.org';

  constructor(private http: HttpClient) { }

  getGamePgn(gameId: string): Observable<string> {
    const url = `${this.baseUrl}/game/export/${gameId}`;
    return this.http.get(url, { responseType: 'text' });
  }
}

