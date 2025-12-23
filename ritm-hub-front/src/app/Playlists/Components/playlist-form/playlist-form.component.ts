import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer'; 
import * as PlaylistActions from '../../actions/playlist.action';
import { PlaylistDto } from '../../Models/playlist.dto';
import { CommonModule } from '@angular/common';

export interface CreatePlaylistDto {
  name: string;
  description?: string;
  images?: string[];
  is_public?: boolean;
}

@Component({
  selector: 'app-playlist-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './playlist-form.component.html',
  styleUrl: './playlist-form.component.css'
})
export class PlaylistFormComponent {
  playlist: PlaylistDto;
  name: FormControl;
  description: FormControl;
  images: FormControl;
  public: FormControl;

  playlistForm: FormGroup;
  private playlistId: string | null = null;
  isValidForm: boolean | null = false;
  isUpdateMode: boolean = false;
  private userId: number | null = null;
  
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
  ) {
    this.userId = 0;

    this.playlistId = this.activatedRoute.snapshot.paramMap.get('id');
    this.playlist = {
    playlist_id: 0,
    name: '',
    description: null,
    images: null,
    owner_id: null,
    tracks: [],
    is_public: false,
    external_id: null,
    createdAt: ''
  } as PlaylistDto;

    this.name = new FormControl(this.playlist.name, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]);
    this.description = new FormControl(this.playlist.description, [
      Validators.maxLength(200),
    ]);
    this.images = new FormControl(this.playlist.images, [
      Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i)
    ]);
    this.public = new FormControl( false );

    this.playlistForm = this.formBuilder.group({
      name: this.name,
      description: this.description,
      images: this.images,
      public: this.public,
    });

    this.store.select('authState').subscribe((auth) => {
      if (auth.user) {
        this.userId = auth.user.id;
      }
    });

    this.store.select('playlistState').subscribe((playlist) => {
      if(playlist.playlist) {
        this.playlist = playlist.playlist;

        this.playlistForm.patchValue({
          name: this.playlist.name,
          description: this.playlist.description,
          images: this.playlist.images,
          public: { public: this.playlist.is_public || false },
        });
      }
    })
  } 

  ngOnInit(): void {
    if (this.playlistId) {
      this.isUpdateMode = true;
      this.store.dispatch(
        PlaylistActions.getPlaylistById({ playlistId: this.playlistId })
      );
    } else {
      this.playlistForm.reset();
    }
  }

  private createPlaylist() {
    if (this.userId) {
      this.store.dispatch(
        PlaylistActions.postCreateUserPlaylist({
          playlist: {
            playlist_id: 0, // <-- se asigna en el backend
            name: this.playlistForm.value.name,
            description: this.playlistForm.value.description,
            images: this.playlistForm.value.images,
            is_public: this.playlistForm.value.public,
            tracks: [],
            owner_id: this.userId,
          } as PlaylistDto,
        })
      );
    }
  }

  private editPlaylist() {
    if (this.playlistId) {
      this.store.dispatch(
        PlaylistActions.postCreateUserPlaylist({ // Cambiar por updatePlaylist cuando lo crees
          playlist: {
            playlist_id: parseInt(this.playlistId), // <-- convierte a number
            name: this.playlistForm.value.name,
            description: this.playlistForm.value.description,
            images: this.playlistForm.value.images,
            is_public: this.playlistForm.value.public,
            tracks: this.playlist.tracks,
            owner_id: this.userId,
          } as PlaylistDto,
        })
      );
    }
  }

  savePlaylist() {
    this.isValidForm = false;

    if (this.playlistForm.invalid) {
      this.playlistForm.markAllAsTouched();
      return;
    }
    
    this.isValidForm = true;
    this.playlist = this.playlistForm.value;

    if(this.isUpdateMode) {
      this.editPlaylist();
    } else {
      this.createPlaylist();
    }


  }
}
