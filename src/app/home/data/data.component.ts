import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChess, faDatabase } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})
export class DataComponent {
  faChess = faChess;
  faDatabase = faDatabase;

}
