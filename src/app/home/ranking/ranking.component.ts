import { Component } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { User } from '../../shared/user';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [HttpClientModule],
  providers: [ApiService],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent {

  top: User[] = []
  constructor(private apiService: ApiService) {
    this.apiService.getMaxScores().subscribe({
      next: (users) => {
        this.top = users.sort((a, b) => b.score - a.score);
      },
      error: (error) => {
      },
    });
  }
  getInitials(name: string): string {
    const list = name.split(" ");
    let i: number = 0;
    let result: string = "";
    while (i < 3) {

      if (list[i]) {
        result += list[i][0].toUpperCase();
      }
      i++;
    }
    return result;

  }

}
