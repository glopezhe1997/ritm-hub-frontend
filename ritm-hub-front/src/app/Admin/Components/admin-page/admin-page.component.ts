import { Component, OnInit } from '@angular/core';
import { StatisticsAppDto } from '../../Models/statistics-app.dto';
import { AppState } from '../../../app.reducer';
import { Store } from '@ngrx/store';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { getStatistics } from '../../actions';
import { CardStatisticsComponent } from '../card-statistics/card-statistics.component';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [NgChartsModule, CardStatisticsComponent, RouterLink],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements OnInit{
  dataStatistics: StatisticsAppDto | null = null

  //Chart options
  userChartData = {
    labels: ['Active', 'Inactive'],
    datasets: [
      { data: [0, 0], label: 'Users' }
    ]
  };

  userChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Active vs Inactive Users' }
    }
  };

  //Chart options
  playlistChartData = {
    labels: ['Public', 'Private'],
    datasets: [
      { data: [0, 0], label: 'Playlists' }
    ]
  };

  playlistChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Public vs Private Playlists' }
    }
  };
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getStatistics());

    this.store.select('adminState').subscribe(({ statistics }) => {
      this.dataStatistics = statistics;

      if (statistics) {
        this.userChartData = {
          labels: ['Active', 'Inactive'],
          datasets: [
            { data: [statistics.totalActiveUsers, statistics.totalInactiveUsers], label: 'Users' }
          ]
        };
        this.playlistChartData = {
          labels: ['Public', 'Private'],
          datasets: [
            { data: [statistics.totalPublicPlaylists, statistics.totalPrivatePlaylists], label: 'Playlists' }
          ]
        };
      }
    });

    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

}
