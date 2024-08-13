import { Injectable, signal } from '@angular/core';
import { ChessGame } from './pgn';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  scores = signal<number[]>([]);
  currentGame = signal(0);
  currentMove = signal(0);
  board = signal<any>(null); // Ajusta el tipo según sea necesario
  matchsPgn = signal<ChessGame[]>([]);
  gamesList = signal<any[]>([]); // Ajusta el tipo según sea necesario
}
