
import { Component } from '@angular/core';
import { BoardComponent } from './board/board.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { PgnViewerComponent } from './pgn-viewer/pgn-viewer.component';
import { PlayerInputComponent } from './player-input/player-input.component';
import { GameTabsComponent } from './game-tabs/game-tabs.component';
import { Chess } from 'chess.js';
import { ApiService } from '../shared/api.service';
import { ApiLichessService } from '../shared/api.lichess.service';
import { HttpClientModule } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    BoardComponent,
    ControlPanelComponent,
    PgnViewerComponent,
    PlayerInputComponent,
    GameTabsComponent,
    HttpClientModule,
  ],
  providers: [ApiService, ApiLichessService],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'], // Corregí styleUrl a styleUrls
})
export class GameComponent {
  scores: number[] = [];
  matchsPgn: string[] = [];
  board = new Chess();
  pieces = this.board.board();

  constructor(
    private apiService: ApiService,
    private apiLichessService: ApiLichessService
  ) {
    this.loadRandomGames();
  }

  loadRandomGames() {
    const randomNumbers = Array.from({ length: 5 }, () =>
      Math.floor(Math.random() * (4062424 - 2 + 1)) + 2
    );

    // Primero obtenemos todos los IDs de los juegos.
    const gameIds$ = forkJoin(
      randomNumbers.map((num) => this.apiService.getGame(num))
    );

    // Luego, con esos IDs obtenemos los PGNs.
    gameIds$
      .pipe(
        switchMap((games) =>
          forkJoin(games.map((game) => this.apiLichessService.getGamePgn(game.gameId)))
        )
      )
      .subscribe({
        next: (pgns) => {
          this.matchsPgn = pgns;
          console.log(this.matchsPgn);
        },
        error: (err) => {
          console.error('Error loading games:', err);
        },
      });
  }
}

