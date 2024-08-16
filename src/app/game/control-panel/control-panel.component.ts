import { Component, model, HostListener } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight, faChevronLeft, faPlay, faStop, faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import { input } from '@angular/core';
import { Chess } from 'chess.js';
import { GameMoves } from '../../shared/gameMoves';
@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.css'
})
export class ControlPanelComponent {
  board = model(new Chess());
  currentMove = model(0);
  currentGame = model(0);
  gamesList = input<GameMoves[]>([]);
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faPlay = faPlay;
  faStop = faStop;
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;

  @HostListener('window:keydown',['$event'])
  handleKeyLeft(event: KeyboardEvent){
    if (event.key === ' ') {
      if(this.playInterval){
        this.stopGame();
      }else{
        this.playGame();
      }
    } else if (event.key === 'ArrowLeft' && event.ctrlKey) {
      this.goFirst();
    } else if (event.key === 'ArrowRight' && event.ctrlKey) {
      this.goLast();
    } else if (event.key === 'ArrowLeft') {
      this.goBack()
    } else if (event.key === 'ArrowRight') {
      this.goForward()
    }
  }
  playInterval: any = null;
  goBack() {
    if (this.currentMove() != 0) {
      if(this.playInterval){
        this.stopGame();
      }
      this.currentMove.set(this.currentMove() - 1);
      this.board.set(new Chess(this.gamesList()[this.currentGame()].movesFen[this.currentMove()]));
    }
  }
  goForward() {
    const max = this.gamesList()[this.currentGame()].movesFen.length;
    if (this.currentMove() < max - 1) {
      if(this.playInterval){
        this.stopGame();
      }
      this.currentMove.set(this.currentMove() + 1);
      this.board.set(new Chess(this.gamesList()[this.currentGame()].movesFen[this.currentMove()]));
    }
  }
  goForwardInterval() {
    const max = this.gamesList()[this.currentGame()].movesFen.length;
    if (this.currentMove() < max - 1) {
      this.currentMove.set(this.currentMove() + 1);
      this.board.set(new Chess(this.gamesList()[this.currentGame()].movesFen[this.currentMove()]));
    }
  }
  playGame() {
    if (!this.playInterval) { // Verifica si no hay un intervalo ya corriendo
      const current = this.currentGame();
      this.playInterval = setInterval(() => {
        const max = this.gamesList()[this.currentGame()].movesFen.length;
        if(current != this.currentGame()){
          this.stopGame();
        }
        else if (this.currentMove() < max - 1) {
          this.goForwardInterval(); // Avanza al siguiente movimiento
        } else {
          this.stopGame(); // Detiene la reproducción si llega al final
        }
      }, 1500); // Ajusta el tiempo en milisegundos entre cada movimiento
    }
  }
  goFirst() {
    if(this.playInterval){
        this.stopGame();
    }
    this.currentMove.set(0);
    this.board.set(new Chess(this.gamesList()[this.currentGame()].movesFen[this.currentMove()]))
  }
  goLast() {
    if(this.playInterval){
        this.stopGame();
    }
    this.currentMove.set(this.gamesList()[this.currentGame()].movesFen.length - 1);
    this.board.set(new Chess(this.gamesList()[this.currentGame()].movesFen[this.currentMove()]))
    this.currentMove.set(this.currentMove() )

  }

  stopGame() {
    if (this.playInterval) {
      clearInterval(this.playInterval);
      this.playInterval = null;
    }
  }
}
