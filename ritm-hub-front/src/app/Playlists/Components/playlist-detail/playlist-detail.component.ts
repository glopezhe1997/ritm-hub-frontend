import { Component, OnInit } from '@angular/core';
import { PlaylistDto } from '../../Models/playlist.dto';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { ActivatedRoute } from '@angular/router';
import * as PlaylistActions from '../../actions/playlist.action';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { selectPlaylist } from '../../selectors/playlist.selectors';
import { selectSharedPlaylistWithMe } from '../../selectors/playlist.selectors';
import { DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageTracksPlaylistComponent } from "../manage-tracks-playlist/manage-tracks-playlist.component";
import { ShareButtonComponent } from '../../../Shared/Components/share-button/share-button.component';

@Component({
  selector: 'app-playlist-detail',
  standalone: true,
  imports: [CommonModule, 
    ManageTracksPlaylistComponent,
    ShareButtonComponent,
  ],
  templateUrl: './playlist-detail.component.html',
  styleUrl: './playlist-detail.component.css'
})
export class PlaylistDetailComponent implements OnInit {
  playlistId: number | null = null;
  playlist: PlaylistDto | undefined | null;
  sharedPlaylist: PlaylistDto | undefined | null;

  ownedByUser: boolean = false;
  private destroyRef = inject(DestroyRef);
  
  constructor(
    private store: Store<AppState>,
    private routeActivated: ActivatedRoute,
    
  ) {
    this.playlistId = Number(this.routeActivated.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.playlistId !== null && this.playlistId !== undefined) {
      this.store.dispatch(PlaylistActions.getPlaylistById({ playlistId: this.playlistId }));
      this.store.select(selectPlaylist)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(playlist => {
          this.playlist = playlist;
        });
  
      this.store.select(selectSharedPlaylistWithMe)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(sharedPlaylist => {
          this.sharedPlaylist = sharedPlaylist;
        });
    }
  }
}

