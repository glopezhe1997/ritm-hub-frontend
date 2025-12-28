import { Component, OnInit } from '@angular/core';
import { StatisticsAppDto } from '../../Models/statistics-app.dto';
import { AppState } from '../../../app.reducer';
import { Store } from '@ngrx/store';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { getStatistics } from '../../actions';
import { CardStatisticsComponent } from '../card-statistics/card-statistics.component';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [BaseChartDirective, CardStatisticsComponent, RouterLink],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements OnInit {
  dataStatistics: StatisticsAppDto | null = null;

  // Chart data and options with strong typing
  userChartData: ChartData<'bar'> = {
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        data: [0, 0],
        label: 'Users',
        backgroundColor: ['#9810FA', '#a628ff']
      }
    ]
  };

  userChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: false, labels: { color: '#fff' } },
      title: { display: true, text: 'Active vs Inactive Users', color: '#fff' }
    },
    scales: {
      x: { ticks: { color: '#fff' }, grid: { color: '#444' } },
      y: { ticks: { color: '#fff' }, grid: { color: '#444' } }
    }
  };

  playlistChartData: ChartData<'bar'> = {
    labels: ['Public', 'Private'],
    datasets: [
      {
        data: [0, 0],
        label: 'Playlists',
        backgroundColor: ['#10FA87', '#10CFFF']
      }
    ]
  };

  playlistChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: false, labels: { color: '#fff' } },
      title: { display: true, text: 'Public vs Private Playlists', color: '#fff' }
    },
    scales: {
      x: { ticks: { color: '#fff' }, grid: { color: '#444' } },
      y: { ticks: { color: '#fff' }, grid: { color: '#444' } }
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
            {
              data: [statistics.totalActiveUsers, statistics.totalInactiveUsers],
              label: 'Users',
              backgroundColor: ['#9810FA', '#a628ff']
            }
          ]
        };
        this.playlistChartData = {
          labels: ['Public', 'Private'],
          datasets: [
            {
              data: [statistics.totalPublicPlaylists, statistics.totalPrivatePlaylists],
              label: 'Playlists',
              backgroundColor: ['#10FA87', '#10CFFF']
            }
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