import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaylistFormComponent } from './playlist-form.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import * as PlaylistActions from '../../actions/playlist.action';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PlaylistFormComponent', () => {
  let component: PlaylistFormComponent;
  let fixture: ComponentFixture<PlaylistFormComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  const mockPlaylist = {
    playlist_id: 1,
    name: 'Test Playlist',
    description: 'desc',
    images: ['https://img.com/img.png'],
    owner_id: 1,
    tracks: [],
    is_public: true,
    external_id: null,
    createdAt: ''
  };

  const initialState = {
    authState: { user: { id: 1, username: 'test' } },
    playlistState: { playlist: null }
  };

  function setPlaylistInStore(playlist: any) {
    store.setState({
      ...initialState,
      playlistState: { playlist }
    });
    store.refreshState();
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistFormComponent, ReactiveFormsModule],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => null } } // por defecto modo creación
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(PlaylistFormComponent);
    component = fixture.componentInstance;
    dispatchSpy = spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render "Create Playlist" in create mode', () => {
    const title = fixture.nativeElement.querySelector('h2');
    expect(title.textContent).toContain('Create Playlist');
  });

  it('should render "Edit Playlist" in edit mode', () => {
    // Simula modo edición
    const route = TestBed.inject(ActivatedRoute);
    spyOn(route.snapshot.paramMap, 'get').and.returnValue('1');
    component.ngOnInit();
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('h2');
    expect(title.textContent).toContain('Edit Playlist');
  });

  it('should validate required name', () => {
    component.name.setValue('');
    component.name.markAsTouched();
    fixture.detectChanges();
    expect(component.name.invalid).toBeTrue();
    const error = fixture.nativeElement.querySelector('.text-red-500');
    expect(error.textContent).toContain('Name is required');
  });

  it('should validate min and max length for name', () => {
    component.name.setValue('ab');
    component.name.markAsTouched();
    fixture.detectChanges();
    expect(component.name.errors?.['minlength']).toBeTruthy();

    component.name.setValue('a'.repeat(51));
    component.name.markAsTouched();
    fixture.detectChanges();
    expect(component.name.errors?.['maxlength']).toBeTruthy();
  });

  it('should validate image url pattern', () => {
    component.images.setValue('not-a-url');
    component.images.markAsTouched();
    fixture.detectChanges();
    expect(component.images.errors?.['pattern']).toBeTruthy();
  });

  it('should dispatch postCreateUserPlaylist on valid submit in create mode', () => {
    component.name.setValue('My Playlist');
    component.description.setValue('desc');
    component.images.setValue('https://img.com/img.png');
    component.is_public.setValue(true);
    fixture.detectChanges();

    component.savePlaylist();

    expect(dispatchSpy).toHaveBeenCalledWith(
      PlaylistActions.postCreateUserPlaylist({
        playlist: {
          name: 'My Playlist',
          description: 'desc',
          images: ['https://img.com/img.png'],
          is_public: true
        }
      })
    );
  });

  it('should dispatch updateUserPlaylist on valid submit in edit mode', () => {
    // Simula modo edición
    const route = TestBed.inject(ActivatedRoute);
    spyOn(route.snapshot.paramMap, 'get').and.returnValue('1');
    component.ngOnInit();
    fixture.detectChanges();
  
    // Simula playlist cargada en el store DESPUÉS de ngOnInit
    setPlaylistInStore(mockPlaylist);
  
    component.name.setValue('Updated Playlist');
    component.description.setValue('updated desc');
    component.images.setValue('https://img.com/img2.png');
    component.is_public.setValue(false);
    fixture.detectChanges();
  
    component.savePlaylist();
  
    expect(dispatchSpy).toHaveBeenCalledWith(
      PlaylistActions.updateUserPlaylist({
        playlistId: 1,
        updateData: {
          name: 'Updated Playlist',
          description: 'updated desc',
          images: ['https://img.com/img2.png'],
          is_public: false
        }
      })
    );
  });

  it('should patch form values when playlist is loaded from store', () => {
    setPlaylistInStore(mockPlaylist);
    expect(component.playlistForm.value.name).toBe('Test Playlist');
    expect(component.playlistForm.value.description).toBe('desc');
    expect(component.playlistForm.value.images).toEqual(['https://img.com/img.png']);
    expect(component.playlistForm.value.is_public).toBe(true);
  });

  it('should not dispatch if form is invalid', () => {
    component.name.setValue('');
    fixture.detectChanges();
    component.savePlaylist();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });
});