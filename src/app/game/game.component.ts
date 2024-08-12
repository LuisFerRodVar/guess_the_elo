import { Component } from '@angular/core';
import { BoardComponent } from './board/board.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { PgnViewerComponent } from './pgn-viewer/pgn-viewer.component';
import { PlayerInputComponent } from './player-input/player-input.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [BoardComponent, ControlPanelComponent, PgnViewerComponent,PlayerInputComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {

}
