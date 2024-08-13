import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight, faChevronLeft, faPlay, faStop, faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.css'
})
export class ControlPanelComponent {
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faPlay = faPlay;
  faStop = faStop;
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;
}
