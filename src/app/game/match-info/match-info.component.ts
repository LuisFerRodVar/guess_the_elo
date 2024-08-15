import { Component, Input } from '@angular/core';
import { faRocket, faBolt, faStopwatch, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { ChessGame } from '../../shared/pgn';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-match-info',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './match-info.component.html',
  styleUrls: ['./match-info.component.css']
})
export class MatchInfoComponent {
  faRocket = faRocket;
  faBolt = faBolt;
  faStopwatch = faStopwatch;
  faHourglassHalf = faHourglassHalf;

  @Input() currentMove: number = 0;
  @Input() matchsPgn: ChessGame[] = [];
  @Input() currentGame: number = 0;

  getTime() {
    const games = this.matchsPgn;
    const index = this.currentGame;

    if (!games || games.length === 0 || index < 0 || index >= games.length) {
      return "";
    }

    const game = games[index];

    if (!game.speed) {
      return "";
    }

    return game.speed;
  }

  isLastMove(): boolean {
    const games = this.matchsPgn;
    const index = this.currentMove;
    const gameIndex = this.currentGame;

    if (!games || games.length === 0 || gameIndex < 0 || gameIndex >= games.length) {
      return false;
    }

    const game = games[gameIndex];

    if (!game.moves || typeof game.moves !== 'string') {
      return false;
    }

    return index === game.moves.split(" ").length;
  }

  getResult() {
    const games = this.matchsPgn;
    const index = this.currentGame;

    if (!games || games.length === 0 || index < 0 || index >= games.length) {
      return "";
    }

    const white = games[index]?.players?.white;
    const result = games[index]?.status;

    if (result === "draw") {
      return "1/2 - 1/2";
    } else {
      if (white?.ratingDiff) {
        const whiteRatingDiff = white?.ratingDiff;
        if (whiteRatingDiff > 0) {
          return "1 - 0";
        } else {
          return "0 - 1";
        }
      }else {
        return "Error"
      }

    }
  }
}

