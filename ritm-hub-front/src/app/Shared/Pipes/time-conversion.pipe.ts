import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeConversion',
  standalone: true
})
export class TimeConversionPipe implements PipeTransform {

  transform(ms: number): string | null {
    if (ms === null || ms === undefined) {
      return null;
    }
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    
    if (!isNaN(minutes) && !isNaN(seconds)) {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    return null;
  }

}
