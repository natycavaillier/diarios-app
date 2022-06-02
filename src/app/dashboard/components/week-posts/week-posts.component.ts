import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { map, Observable } from 'rxjs';
import { DashboardService } from 'src/app/core/services/dashboard/dashboard.service';

@Component({
  selector: 'app-week-posts',
  templateUrl: './week-posts.component.html',
  styleUrls: ['./week-posts.component.scss']
})
export class WeekPostsComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }

  chartData$?: Observable<ChartData>;

  config: ChartConfiguration['options'] = {
    responsive: true,
  };

  ngOnInit(): void {
    this.chartData$ = this.dashboardService.getWeekPosts().pipe(
      map((data) => {
        return {
          labels: Object.keys(data),
          datasets: [
            {
              data: Object.values(data),
              label: 'Quantidade de posts',
            }
          ],
        };
      })
    );
  }

}
