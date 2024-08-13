import { Component } from '@angular/core';
import { input, model } from '@angular/core';
import { GameMoves } from '../../shared/gameMoves';
import { Chess } from 'chess.js';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-pgn-viewer',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './pgn-viewer.component.html',
  styleUrl: './pgn-viewer.component.css'
})
export class PgnViewerComponent {
  gamesList = input<GameMoves[]>([]);
  board = model<Chess>();
  currentGame = model<number>(0);
  currentMove = model<number>(0);
  getMovements() {
    const game = this.gamesList()[this.currentGame()];
    return game?.movesAlgebraic ?? [];
  }

}
