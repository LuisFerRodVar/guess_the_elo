import { Component, computed } from '@angular/core';
import { input } from '@angular/core';
import { Chess } from 'chess.js';
import { faChessKing, faChessQueen, faChessPawn, faChessRook, faChessBishop, IconDefinition, faChessKnight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [FontAwesomeModule, NgClass],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  piecesIcons = new Map<string, IconDefinition>([
    ["k", faChessKing],
    ["q", faChessQueen],
    ["p", faChessPawn],
    ["r", faChessRook],
    ["b", faChessBishop],
    ["n", faChessKnight]

  ]);
  columns: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  rows: string[] = ['8', '7', '6', '5', '4', '3', '2', '1'];
  board = input<Chess>();
  pieces = computed(() => {
    const board = this.board()?.board();
    const piecesMap = new Map<string, { type: string, color: string }>();
    if (board) {
      for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
          const piece = board[row][col];
          if (piece) {
            const coordinate = `${this.columns[col]}${this.rows[row]}`;
            piecesMap.set(coordinate, { type: piece.type, color: piece.color });
          }
        }
      }
    }
    return piecesMap;
  });

  getIconForPiece(type: string): IconDefinition {
    return this.piecesIcons.get(type) ?? faChessPawn;
  }
}
