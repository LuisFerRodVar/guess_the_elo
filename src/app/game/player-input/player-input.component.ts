
import { Component, computed, input, model } from '@angular/core';
import { ChessGame } from '../../shared/pgn';
import { Chess } from 'chess.js';

@Component({
  selector: 'app-player-input',
  standalone: true,
  imports: [], // Incluye FormsModule en los imports
  templateUrl: './player-input.component.html',
  styleUrls: ['./player-input.component.css']
})
export class PlayerInputComponent {
  board = model(new Chess())
  scores = model<number[]>([]);
  currentGame = model(0);
  currentMove = model(0);
  matchsPgn = input<ChessGame[]>();
  currentAnswer = "1000";

  totalScore = computed(() => {
    return this.scores().reduce((sum, score) => sum + score, 0);
  });

  calculateScore() {
    const gameIndex = this.currentGame();
    const game = this.matchsPgn()?.[gameIndex];

    if (game) {
      const { white, black } = game.players;
      const whiteElo = white?.rating;
      const blackElo = black?.rating;

      if (whiteElo !== undefined && blackElo !== undefined) {
        const correctAnswer = Math.floor((whiteElo + blackElo) / 2);
        const userAnswer = parseInt(this.currentAnswer);
        const maxPoints = 1000;
        const difference = Math.abs(correctAnswer - userAnswer);

        const score = Math.max(0, maxPoints - Math.floor(difference / 100) * 50);
        this.scores.update(scores => [...scores, score]);
        this.board.set(new Chess());
        this.currentGame.set(gameIndex + 1);
        this.currentMove.set(0);
      }
    }
  }
}

