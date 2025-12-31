import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-2">
      <div *ngFor="let toast of toastService.toasts$ | async"
           [ngClass]="{
             'bg-green-600': toast.type === 'success',
             'bg-red-600': toast.type === 'error',
             'bg-blue-600': toast.type === 'info',
             'bg-yellow-500': toast.type === 'warning'
           }"
           class="text-white px-4 py-2 rounded shadow min-w-[200px] flex items-center justify-between">
        <span>{{ toast.message }}</span>
        <button class="ml-2" (click)="toastService.remove(toast.id)">✕</button>
      </div>
    </div>
  `
})
export class ToastContainerComponent {
  constructor(public toastService: ToastService) {}
}