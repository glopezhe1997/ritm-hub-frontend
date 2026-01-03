import { TimeConversionPipe } from './time-conversion.pipe';
import { TestBed } from '@angular/core/testing';

describe('TimeConversionPipe', () => {
  let pipe: TimeConversionPipe;
  const testDate = 3661000; 

  beforeEach(() => {
    pipe = new TimeConversionPipe();
  });

  // Test cases
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should convert milliseconds to "minutes:seconds" format', () => {
    const result = pipe.transform(testDate);
    expect(result).toBe('61:01');
  });

  it('should return null for null input', () => {
    const result = pipe.transform(null);
    expect(result).toBeNull();
  });

  it('should return null for undefined input', () => {
    const result = pipe.transform(undefined);
    expect(result).toBeNull();
  });

  it('should handle zero milliseconds', () => {
    const result = pipe.transform(0);
    expect(result).toBe('0:00');
  });
});
