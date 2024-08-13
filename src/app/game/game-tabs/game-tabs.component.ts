import { Component } from '@angular/core';
import { input } from '@angular/core';
@Component({
  selector: 'app-game-tabs',
  standalone: true,
  imports: [],
  templateUrl: './game-tabs.component.html',
  styleUrl: './game-tabs.component.css'
})
export class GameTabsComponent {
  scores = input<number[]>();

}
