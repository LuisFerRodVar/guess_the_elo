import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { ChessGame } from './pgn';

@Injectable({
  providedIn: 'root'
})
export class ApiLichessService {
  private baseUrl = 'https://lichess.org';

  constructor(private http: HttpClient) { }

  getGamePgn(gameId: string): Observable<ChessGame> {
    const url = `${this.baseUrl}/game/export/${gameId}`;
    return this.http.get<ChessGame>(url);
  }
}

