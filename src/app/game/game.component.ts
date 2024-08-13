import { Component } from '@angular/core';
import { BoardComponent } from './board/board.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { PgnViewerComponent } from './pgn-viewer/pgn-viewer.component';
import { PlayerInputComponent } from './player-input/player-input.component';
import { GameTabsComponent } from './game-tabs/game-tabs.component';
import { Chess } from 'chess.js';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [BoardComponent, ControlPanelComponent, PgnViewerComponent,PlayerInputComponent, GameTabsComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  scores:number[] = [];
  matchsPgn:string[] = [];
  board = new Chess();
  pieces = this.board.board();
  constructor(){

  }

}
