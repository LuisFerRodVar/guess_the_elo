import { Component, computed, input, model } from '@angular/core';
import { ChessGame } from '../../shared/pgn';
import { Chess } from 'chess.js';
import { faCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-player-input',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './player-input.component.html',
  styleUrls: ['./player-input.component.css']
})
export class PlayerInputComponent {
  faCircleRight = faCircleRight;
  board = model(new Chess())
  scores = model<number[]>([]);
  currentGame = model(0);
  currentMove = model(0);
  matchsPgn = input<ChessGame[]>();
  currentAnswer = "";
  end = model(false);




  getInitials(name: string): string {
    const list = name.split(" ");
    let i: number = 0;
    let result: string = "";
    while (i < 3) {
      if (list[i]) {
        result += list[i][1].toUpperCase();
      }
    }
    return result;

  }
  setCurrentAnswer(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.currentAnswer = inputElement.value;
  }

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
        if (this.scores().length == 5) {
          this.end.set(true);

        }
        const inputElement = document.querySelector('input[type="number"]') as HTMLInputElement;
        if (inputElement) {
          inputElement.value = ''; // Resetea el valor del input en el DOM
        }
        Swal.fire({
          title: "Puntos obtenidos: " + score,
          text: "Respuesta correcta: " + correctAnswer,
          confirmButtonText: 'Siguiente',
          background: "#4c566a",
          color: "#d8dee9",
          buttonsStyling: false,
          customClass: {
            title: 'title-alert',
            htmlContainer: 'text-alert'
          }
        });
        this.currentAnswer = "";
        this.board.set(new Chess());
        this.currentGame.update(value => value + 1)
        this.currentMove.set(0);
      }
    }
  }
}

