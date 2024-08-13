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
import { ChessGame } from '../shared/pgn';
import { GameMoves } from '../shared/gameMoves';


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
  styleUrl: './game.component.css',
})
export class GameComponent {
  scores: number[] = [];
  matchsPgn: ChessGame[] = [];
  board = new Chess();
  pieces = this.board.board();
  currentGame: number = 0;
  currentMove: number = 0;
  gamesList: GameMoves[] =[];
  end: boolean = false;

  constructor(
    private apiService: ApiService,
    private apiLichessService: ApiLichessService
  ) {
    this.loadRandomGames();
  }
  getTotalScore(){
    let result = 0;
    this.scores.forEach(value =>{
      result += value

    });
    return result;
  }

  loadRandomGames() {
    const randomNumbers = Array.from({ length: 5 }, () =>
      Math.floor(Math.random() * (4062424 - 2 + 1)) + 2
    );
    const gameIds$ = forkJoin(
      randomNumbers.map((num) => this.apiService.getGame(num))
    );
    gameIds$
      .pipe(
        switchMap((games) =>
          forkJoin(games.map((game) => this.apiLichessService.getGamePgn(game.gameId)))
        )
      )
      .subscribe({
        next: (pgns) => {
          this.matchsPgn = pgns;
          this.matchsPgn.forEach(match => {
            const moves = this.getGamesFen(match.moves);
            const movesAlgebraic = match.moves.split(" ");
            this.gamesList.push({movesFen: moves, movesAlgebraic});
          });
        },
        error: (err) => {
          console.error('Error loading games:', err);
        },
      });
  }
  getGamesFen(moves: string):string[] {
    const list: string[] = moves.split(" ");
    let result: string[] = [];
    let board = new Chess();
    result.push(board.fen());
    list.forEach(move => {
      board.move(move);
      result.push(board.fen());
    });
    return result;
  }
}

