import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import * as PostActions from '../../actions/post.action';
import { PostDto } from '../../Models/post.dto';
import { PostStatus } from '../../Models/post-status.enum';
import { CreatePostDto } from '../../Models/create-post.dto';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../../Search/Components/search-bar/search-bar.component';
import { TracksService } from '../../../Tracks/services/tracks.service';
import { TimeConversionPipe } from '../../../Shared/Pipes/time-conversion.pipe';
import { TrackDto } from '../../../Tracks/Models/track.dto';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TimeConversionPipe, SearchBarComponent],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent implements OnInit {
  post: PostDto | null = null;
  title: FormControl;
  content: FormControl;
  status: FormControl;
  track: FormControl;
  searchResults: any[] = [];

  postForm: FormGroup;
  private postId: string | null = null;
  isValidForm: boolean | null = false;
  isUpdateMode: boolean = false;

  // Enum values for select
  postStatusOptions = Object.values(PostStatus);

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private tracksService: TracksService
  ) {
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');

    this.title = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]);
    this.content = new FormControl('', [
      Validators.required,
      Validators.maxLength(500),
    ]);
    this.status = new FormControl(PostStatus.HAPPY, [Validators.required]);
    this.track = new FormControl(null);

    this.postForm = this.formBuilder.group({
      title: this.title,
      content: this.content,
      status: this.status,
      track: this.track,
    });

    // Si tienes un store con el post cargado, puedes hacer patchValue aquí
    this.store.select('postState').subscribe((postState) => {
      if (postState.post) {
        this.post = postState.post;
        this.postForm.patchValue({
          title: this.post.title,
          content: this.post.content,
          status: this.post.status,
          track: this.post.track ?? null,
        });
      }
    });
  }

  ngOnInit(): void {
    if (this.postId) {
      this.isUpdateMode = true;
      this.store.dispatch(
        PostActions.getMyPostById({ postId: Number(this.postId) })
      );
    } else {
      this.postForm.reset({ status: PostStatus.HAPPY });
    }
  }

  onSearchTracks(query: string) {
    console.log('Buscando:', query);
    this.tracksService.searchTracks(query).subscribe(tracks => {
      this.searchResults = tracks;
      console.log('Resultados de búsqueda:', this.searchResults);
    });
  }

  addTrackToPost(track: any) {
    this.track.setValue(track);
    console.log('Track añadido al post:', track);
    this.searchResults = [];
  }

  removeTrackFromPost() {
    this.track.setValue(null);
  }

 private createPost() {
    // Extrae solo los campos que necesitas de la track seleccionada
    let trackToSend: string | undefined = undefined;
    if (this.postForm.value.track) {
      const t = this.postForm.value.track;
      if(t) {
        trackToSend = t.id;
      }
    }

    const postToSend: CreatePostDto = {
      title: this.postForm.value.title,
      content: this.postForm.value.content,
      status: this.postForm.value.status,
      track_id: trackToSend,
    };

    this.store.dispatch(
      PostActions.postCreateUserPost({
        post: postToSend
      })
    );
  }

  // private editPost() {
  //   if (this.postId) {
  //     const postToSend: CreatePostDto = {
  //       title: this.postForm.value.title,
  //       content: this.postForm.value.content,
  //       status: this.postForm.value.status,
  //       track: this.postForm.value.track ?? null,
  //     };

  //     // Aquí deberías tener una acción updateUserPost (añádela si no la tienes)
  //     this.store.dispatch(
  //       PostActions.updateUserPost({
  //         postId: parseInt(this.postId),
  //         updateData: postToSend
  //       })
  //     );
  //   }
  // }

  savePost() {
    this.isValidForm = false;

    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }

    this.isValidForm = true;

    if (this.isUpdateMode) {
      // this.editPost();
    } else {
      this.createPost();
    }
  }
}