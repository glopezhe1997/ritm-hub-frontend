import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer'; 
import * as PlaylistActions from '../../actions/playlist.action';
import { PlaylistDto } from '../../Models/playlist.dto';
import { CommonModule } from '@angular/common';
import { UpdatePlaylistDto } from '../../Models/update-playlist.dto';

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
  is_public: FormControl;

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

    this.playlist = {
    playlist_id: 0,
    name: '',
    description: null,
    images: [],
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
    this.is_public = new FormControl( false );

    this.playlistForm = this.formBuilder.group({
      name: this.name,
      description: this.description,
      images: this.images,
      is_public: this.is_public,
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
          is_public: this.playlist.is_public,
        });
      }
    })
  } 

  ngOnInit(): void {
        this.playlistId = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.playlistId) {
      this.isUpdateMode = true;
      this.store.dispatch(
        PlaylistActions.getPlaylistById({ playlistId: Number(this.playlistId) })
      );
    } else {
      this.playlistForm.reset();
    }
  }

  private createPlaylist() {
    if (this.userId) {
      const playlistToSend: CreatePlaylistDto = {
        name: this.playlistForm.value.name,
        description: this.playlistForm.value.description,
        images: this.imagesToArray(this.playlistForm.value.images),
        is_public: this.playlistForm.value.is_public ?? false,
      };

      console.log('Creando playlist, datos enviados al backend:', playlistToSend);

      this.store.dispatch(
        PlaylistActions.postCreateUserPlaylist({
          playlist: playlistToSend
        })
      );
    }
  }

  private editPlaylist() {
    if (this.playlistId) {
      const playlistToSend: UpdatePlaylistDto = {
        name: this.playlistForm.value.name,
        description: this.playlistForm.value.description,
        images: this.imagesToArray(this.playlistForm.value.images),
        is_public: this.playlistForm.value.is_public ?? false,
      };

      console.log('Editando playlist, datos enviados al backend:', playlistToSend);

      this.store.dispatch(
        PlaylistActions.updateUserPlaylist({
          playlistId: parseInt(this.playlistId),
          updateData: playlistToSend
        })
      );
    }
  }

  // Añade este método auxiliar:
  private imagesToArray(imagesField: string | string[]): string[] {
    if (Array.isArray(imagesField)) return imagesField;
    if (typeof imagesField === 'string' && imagesField.trim() !== '') {
      return imagesField.split(',').map(img => img.trim());
    }
    return [];
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
