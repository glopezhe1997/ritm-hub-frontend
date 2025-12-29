import { Component, OnInit } from '@angular/core';
import { StatisticsAppDto } from '../../Models/statistics-app.dto';
import { AppState } from '../../../app.reducer';
import { Store } from '@ngrx/store';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { getStatistics } from '../../actions';
import { CardStatisticsComponent } from '../card-statistics/card-statistics.component';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { SearchBarComponent } from '../../../Search/Components/search-bar/search-bar.component';
import { UsersService } from '../../../Users/services/users.service';
import { map, Observable } from 'rxjs';
import { UserDto } from '../../../Users/models/user.dto';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    BaseChartDirective, 
    CardStatisticsComponent, 
    RouterLink,
    SearchBarComponent,
    CommonModule,
  ],
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

  // Manage Users
  searchText: string = '';
  users$: Observable<UserDto[]> | null = null;
  isActive: boolean = false; // Control css class for Activate/Deactivate button
  isBlocked: boolean = false; // Control css class for Block/Unblock button

  // Toast messages
  toastMessage: string | null = null;
  toastTimeout: any = null;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private adminService: AdminService,
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

  // Toast message handler
  showToast(message: string) {
    this.toastMessage = message;
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    this.toastTimeout = setTimeout(() => {
      this.toastMessage = null;
    }, 3000);
  }

  // Manage Users

  onSearchUsers(searchText: string) {
    this.searchText = searchText;
    this.users$ = this.usersService.searchUsers(searchText);
  }

  // Activate or Deactivate User
    toggleUserStatus(user: UserDto): Observable<{ message: string, user: UserDto | null }> {
    return user.isActive
      ? this.adminService.deactivateUser(user.id)
      : this.adminService.activateUser(user.id);
  }

  // Bloquea o desbloquea usuario (devuelve observable)
  toggleUserBlock(user: UserDto): Observable<{ message: string, user: UserDto | null }> {
    return user.isBlocked
      ? this.adminService.unblockUser(user.id)
      : this.adminService.blockUser(user.id);
  }

  // Handler para el botón de activar/desactivar
  onToggleUserStatus(user: UserDto) {
    this.toggleUserStatus(user).subscribe((res) => {
      this.onSearchUsers(this.searchText);
      this.showToast(res.message);
      this.store.dispatch(getStatistics());

    });
  }

  // Handler para el botón de bloquear/desbloquear
  onToggleUserBlock(user: UserDto) {
    this.toggleUserBlock(user).subscribe((res) => {
      this.onSearchUsers(this.searchText);
      this.showToast(res.message);
      this.store.dispatch(getStatistics());
    });
  }

  // Change user role
    onChangeUserRole(user: UserDto, newRole: string) {
    this.adminService.changeUserRole(user.id, newRole).subscribe((res) => {
      this.onSearchUsers(this.searchText);
      this.showToast(res.message);
      this.store.dispatch(getStatistics());
    });
  }
}