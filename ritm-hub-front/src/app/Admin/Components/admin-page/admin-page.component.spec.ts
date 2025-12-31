import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPageComponent } from './admin-page.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../Users/services/users.service';
import { AdminService } from '../../services/admin.service';
import { ToastService } from '../../../Shared/services/toast.service';
import { CardStatisticsComponent } from '../card-statistics/card-statistics.component';
import { SearchBarComponent } from '../../../Search/Components/search-bar/search-bar.component';
import { UserDto } from '../../../Users/models/user.dto';
import { StatisticsAppDto } from '../../Models/statistics-app.dto';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

describe('AdminPageComponent', () => {
  let component: AdminPageComponent;
  let fixture: ComponentFixture<AdminPageComponent>;
  let store: MockStore;
  let usersServiceMock: jasmine.SpyObj<UsersService>;
  let adminServiceMock: jasmine.SpyObj<AdminService>;
  let toastServiceMock: jasmine.SpyObj<ToastService>;

  const mockStatistics: StatisticsAppDto = {
    totalUsers: 10,
    totalActiveUsers: 7,
    totalInactiveUsers: 3,
    totalPlaylists: 5,
    totalPublicPlaylists: 2,
    totalPrivatePlaylists: 3
  };

  const mockUsers: UserDto[] = [
    {
      id: 1,
      name: 'User 1',
      email: 'user1@mail.com',
      username: 'user1',
      Birthdate: new Date('2000-01-01'),
      role: 'user',
      isActive: true,
      isBlocked: false,
      createdAt: new Date('2023-01-01')
    },
    {
      id: 2,
      name: 'User 2',
      email: 'user2@mail.com',
      username: 'user2',
      Birthdate: new Date('2001-01-01'),
      role: 'user',
      isActive: false,
      isBlocked: true,
      createdAt: new Date('2023-01-01')
    }
  ];

  beforeEach(async () => {
    usersServiceMock = jasmine.createSpyObj('UsersService', ['searchUsers']);
    adminServiceMock = jasmine.createSpyObj('AdminService', [
      'activateUser',
      'deactivateUser',
      'blockUser',
      'unblockUser',
      'changeUserRole'
    ]);
    toastServiceMock = jasmine.createSpyObj('ToastService', ['show']);

    await TestBed.configureTestingModule({
      imports: [
        AdminPageComponent,
        CardStatisticsComponent,
        SearchBarComponent,
        CommonModule
      ],
      providers: [
        provideMockStore({
          initialState: {
            adminState: { statistics: mockStatistics }
          }
        }),
        { provide: UsersService, useValue: usersServiceMock },
        { provide: AdminService, useValue: adminServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
        { provide: ActivatedRoute, useValue: { fragment: of(null) } }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should show error toast on adminService block error (err.message)', () => {
    const user = { ...mockUsers[0] };
    const error = { message: 'Block error!' };
    adminServiceMock.blockUser.and.returnValue({
      subscribe: (handlers: any) => handlers.error(error)
    } as any);
  
    component.searchText = 'user';
    component.onToggleUserBlock(user);
  
    expect(toastServiceMock.show).toHaveBeenCalledWith('Block error!', 'error');
  });
  
  it('should show error toast on adminService block error (default message)', () => {
    const user = { ...mockUsers[0] };
    const error = {};
    adminServiceMock.blockUser.and.returnValue({
      subscribe: (handlers: any) => handlers.error(error)
    } as any);
  
    component.searchText = 'user';
    component.onToggleUserBlock(user);
  
    expect(toastServiceMock.show).toHaveBeenCalledWith('Error changing user block status', 'error');
  });
  
  it('should show error toast on adminService changeUserRole error (err.error.message)', () => {
    const user = { ...mockUsers[0] };
    const error = { error: { message: 'Role error!' } };
    adminServiceMock.changeUserRole.and.returnValue({
      subscribe: (handlers: any) => handlers.error(error)
    } as any);
  
    component.searchText = 'user';
    component.onChangeUserRole(user, 'admin');
  
    expect(toastServiceMock.show).toHaveBeenCalledWith('Role error!', 'error');
  });
  
  it('should show error toast on adminService changeUserRole error (err.message)', () => {
    const user = { ...mockUsers[0] };
    const error = { message: 'Role error 2!' };
    adminServiceMock.changeUserRole.and.returnValue({
      subscribe: (handlers: any) => handlers.error(error)
    } as any);
  
    component.searchText = 'user';
    component.onChangeUserRole(user, 'admin');
  
    expect(toastServiceMock.show).toHaveBeenCalledWith('Role error 2!', 'error');
  });
  
  it('should show error toast on adminService changeUserRole error (default message)', () => {
    const user = { ...mockUsers[0] };
    const error = {};
    adminServiceMock.changeUserRole.and.returnValue({
      subscribe: (handlers: any) => handlers.error(error)
    } as any);
  
    component.searchText = 'user';
    component.onChangeUserRole(user, 'admin');
  
    expect(toastServiceMock.show).toHaveBeenCalledWith('Error changing user role', 'error');
  });
  
  it('should render statistics cards with default values when dataStatistics is null', () => {
    component.dataStatistics = null;
    fixture.detectChanges();
  
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Total Users');
    expect(compiled.textContent).toContain('0');
    expect(compiled.textContent).toContain('Total Playlists');
    expect(compiled.textContent).toContain('0');
  });
  
  it('should call deactivateUser in toggleUserStatus if user is active', () => {
    const user = { ...mockUsers[0], isActive: true };
    adminServiceMock.deactivateUser.and.returnValue(of({ message: 'Deactivated', user }));
  
    const obs = component.toggleUserStatus(user);
    obs.subscribe(res => {
      expect(res.message).toBe('Deactivated');
    });
    expect(adminServiceMock.deactivateUser).toHaveBeenCalledWith(user.id);
  });
  
  it('should call activateUser in toggleUserStatus if user is not active', () => {
    const user = { ...mockUsers[0], isActive: false };
    adminServiceMock.activateUser.and.returnValue(of({ message: 'Activated', user }));
  
    const obs = component.toggleUserStatus(user);
    obs.subscribe(res => {
      expect(res.message).toBe('Activated');
    });
    expect(adminServiceMock.activateUser).toHaveBeenCalledWith(user.id);
  });
  
  it('should call unblockUser in toggleUserBlock if user is blocked', () => {
    const user = { ...mockUsers[0], isBlocked: true };
    adminServiceMock.unblockUser.and.returnValue(of({ message: 'Unblocked', user }));
  
    const obs = component.toggleUserBlock(user);
    obs.subscribe(res => {
      expect(res.message).toBe('Unblocked');
    });
    expect(adminServiceMock.unblockUser).toHaveBeenCalledWith(user.id);
  });
  
  it('should call blockUser in toggleUserBlock if user is not blocked', () => {
    const user = { ...mockUsers[0], isBlocked: false };
    adminServiceMock.blockUser.and.returnValue(of({ message: 'Blocked', user }));
  
    const obs = component.toggleUserBlock(user);
    obs.subscribe(res => {
      expect(res.message).toBe('Blocked');
    });
    expect(adminServiceMock.blockUser).toHaveBeenCalledWith(user.id);
  });
  
  it('should scroll to fragment if present', () => {
    // Simula un elemento en el DOM
    const scrollIntoViewSpy = jasmine.createSpy('scrollIntoView');
    const elementMock = { scrollIntoView: scrollIntoViewSpy };
    spyOn(document, 'getElementById').and.returnValue(elementMock as any);
  
    // Simula el fragmento en la ruta
    const route = TestBed.inject(ActivatedRoute);
    (route.fragment as any) = of('statistics');
  
    // Vuelve a inicializar el componente para que se ejecute ngOnInit con el nuevo fragment
    component.ngOnInit();
  
    expect(document.getElementById).toHaveBeenCalledWith('statistics');
    expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: 'smooth' });
  });
});