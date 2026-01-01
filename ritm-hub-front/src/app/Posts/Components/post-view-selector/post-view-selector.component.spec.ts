import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostViewSelectorComponent } from './post-view-selector.component';
import { ViewSelected } from '../../Models/view-selected.enum';
import { By } from '@angular/platform-browser';

describe('PostViewSelectorComponent', () => {
  let component: PostViewSelectorComponent;
  let fixture: ComponentFixture<PostViewSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostViewSelectorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PostViewSelectorComponent);
    component = fixture.componentInstance;
    component.viewSelected = ViewSelected.FEED;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a button for each view', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(component.views.length);
    expect(buttons[0].nativeElement.textContent).toContain('Feed');
    expect(buttons[1].nativeElement.textContent).toContain('Myposts');
    expect(buttons[2].nativeElement.textContent).toContain('Following');
  });

  it('should highlight the selected view', () => {
    component.viewSelected = ViewSelected.MYPOSTS;
    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons[1].nativeElement.className).toContain('bg-[#9810FA]');
    expect(buttons[1].nativeElement.className).toContain('text-white');
    expect(buttons[0].nativeElement.className).not.toContain('bg-[#9810FA]');
  });

  it('should emit viewChange when a button is clicked', () => {
    spyOn(component.viewChange, 'emit');
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons[2].nativeElement.click();
    expect(component.viewChange.emit).toHaveBeenCalledWith(ViewSelected.FOLLOWING);
  });
});