import { Component, input } from '@angular/core';
import { faRocket, faBolt, faStopwatch, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { ChessGame } from '../../shared/pgn';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-match-info',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './match-info.component.html',
  styleUrl: './match-info.component.css'
})
export class MatchInfoComponent {
  faRocket = faRocket;
  faBolt = faBolt;
  faStopwatch = faStopwatch;
  faHourglassHalf = faHourglassHalf;

  matchsPgn = input<ChessGame[]>([]);
  currentGame = input<number>(0);


  getTime() {
    const games = this.matchsPgn();
    const index = this.currentGame();

    if (!games || games.length === 0 || index < 0 || index >= games.length) {
      return "";
    }

    const game = games[index];

    if (!game.speed) {
      return "";
    }

    return game.speed;
  }


}
