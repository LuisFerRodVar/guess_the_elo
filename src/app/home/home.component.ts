import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { RankingComponent } from './ranking/ranking.component';
import { RouterLink } from '@angular/router';
import { DataComponent } from './data/data.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule, RankingComponent, RouterLink, DataComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  faLightbulb = faGraduationCap;
  faQuestion = faQuestion;
  faTrophy = faTrophy;
}
