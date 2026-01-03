import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TracksService } from './tracks.service';
import { environment } from '../../../environments/environment';
import { TrackDto } from '../Models/track.dto';

describe('TracksService', () => {
  let service: TracksService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/tracks`;
  const searchUrl = `${environment.apiUrl}/spotify/search`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TracksService]
    });
    service = TestBed.inject(TracksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get trending tracks', () => {
    const mockTracks: TrackDto[] = [
      { id: 1, name: 'Track 1', album: { name: 'Album 1' }, artists: [{ name: 'Artist 1' }], duration_ms: 200000 }
    ];

    service.getTrendingTracks().subscribe(tracks => {
      expect(tracks).toEqual(mockTracks);
    });

    const req = httpMock.expectOne(`${apiUrl}/trending`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTracks);
  });

  it('should search tracks', () => {
    const query = 'test';
    const mockTracks: TrackDto[] = [
      { id: 2, name: 'Track 2', album: { name: 'Album 2' }, artists: [{ name: 'Artist 2' }], duration_ms: 180000 }
    ];
    const mockResponse = { tracks: mockTracks };
  
    service.searchTracks(query).subscribe(tracks => {
      expect(tracks).toEqual(mockTracks);
    });
  
    const req = httpMock.expectOne(`${searchUrl}?q=${encodeURIComponent(query)}&type=track`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
  
  it('should return empty array if tracks is undefined in searchTracks', () => {
    const query = 'empty';
    const mockResponse = { tracks: undefined };
  
    service.searchTracks(query).subscribe(tracks => {
      expect(tracks).toEqual([]);
    });
  
    const req = httpMock.expectOne(`${searchUrl}?q=${encodeURIComponent(query)}&type=track`);
    req.flush(mockResponse);
  });
});