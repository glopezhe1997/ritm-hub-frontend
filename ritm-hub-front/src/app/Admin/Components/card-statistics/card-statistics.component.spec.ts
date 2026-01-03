import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardStatisticsComponent } from './card-statistics.component';
import { By } from '@angular/platform-browser';

describe('CardStatisticsComponent', () => {
  let component: CardStatisticsComponent;
  let fixture: ComponentFixture<CardStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardStatisticsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CardStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title and value', () => {
    component.title = 'Total Users';
    component.value = 42;
    fixture.detectChanges();

    const titleElem = fixture.debugElement.query(By.css('.text-sm')).nativeElement;
    const valueElem = fixture.debugElement.query(By.css('.text-2xl')).nativeElement;

    expect(titleElem.textContent).toContain('Total Users');
    expect(valueElem.textContent).toContain('42');
  });
});