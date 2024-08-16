import { Component } from '@angular/core';
import { input, model } from '@angular/core';
import { GameMoves } from '../../shared/gameMoves';
import { Chess } from 'chess.js';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-pgn-viewer',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './pgn-viewer.component.html',
  styleUrl: './pgn-viewer.component.css'
})

export class PgnViewerComponent {
  gamesList = input<GameMoves[]>([]);
  board = model(new Chess());
  currentGame = model(0);
  currentMove = model(0);

  getMovements() {
    const game = this.gamesList()[this.currentGame()];
    return game?.movesAlgebraic ?? [];
  }
  charToEmoji(move: string){
    let result = "";
    for(let i = 0; i < move.length; i ++){
      const current = move.charAt(i);
      if(current == 'R'){
        result += "♜";
      }else if (current == 'Q'){
        result += "♛";
      }else if (current == 'K'){
        result += "♚";
      }else if (current == 'N'){
        result += "♞";
      }else if (current == 'B'){
        result += "♝";
      }else{
        result += current;
      }
    }
    return result;


  }
  goTo(movement: number) {
    this.board.set(new Chess(this.gamesList()[this.currentGame()].movesFen[movement]))
    this.currentMove.set(movement);
  }


}
