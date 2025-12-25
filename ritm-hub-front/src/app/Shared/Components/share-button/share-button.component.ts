import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-share-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './share-button.component.html',
  styleUrl: './share-button.component.css'
})
export class ShareButtonComponent {
  @Input() item: string = '';
  @Input() isPublic: boolean | undefined = true;
  @Input() playlistId?: number;

  copied = false;

  share() {
    if (this.isPublic) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        this.copied = true;
        setTimeout(() => this.copied = false, 1500);
      });
    } else {
      // Aquí puedes abrir un modal/input para pedir el usuario destino
      // y luego llamar a tu API para registrar el share en shared_playlists
      alert('Funcionalidad de compartir privada: aquí deberías pedir el usuario destino y llamar a la API.');
    }
  }
}