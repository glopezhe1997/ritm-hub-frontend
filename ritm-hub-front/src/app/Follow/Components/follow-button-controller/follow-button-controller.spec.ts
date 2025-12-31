import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FollowButtonControllerComponent } from './follow-button-controller.component';
import { By } from '@angular/platform-browser';

describe('FollowButtonControllerComponent', () => {
  let component: FollowButtonControllerComponent;
  let fixture: ComponentFixture<FollowButtonControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowButtonControllerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FollowButtonControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show "Follow" when isFollowing is false', () => {
    component.isFollowing = false;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.textContent.trim()).toBe('Follow');
  });

  it('should show "Unfollow" when isFollowing is true', () => {
    component.isFollowing = true;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.textContent.trim()).toBe('Unfollow');
  });

  it('should emit followChange with true when clicked from not following', () => {
    spyOn(component.followChange, 'emit');
    component.isFollowing = false;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');
    expect(component.followChange.emit).toHaveBeenCalledWith(true);
    expect(component.isFollowing).toBeTrue();
  });

  it('should emit followChange with false when clicked from following', () => {
    spyOn(component.followChange, 'emit');
    component.isFollowing = true;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');
    expect(component.followChange.emit).toHaveBeenCalledWith(false);
    expect(component.isFollowing).toBeFalse();
  });

  it('should change button class when isFollowing changes', () => {
    component.isFollowing = false;
    fixture.detectChanges();
    let button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.className).toContain('bg-[#9810FA]');
    component.isFollowing = true;
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.className).toContain('bg-[#f87171]');
  });
});