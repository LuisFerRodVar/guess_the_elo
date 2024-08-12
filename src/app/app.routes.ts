import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { EndComponent } from './end/end.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "game",
    component: GameComponent
  },
  {
    path: "result",
    component: EndComponent
  }
];
