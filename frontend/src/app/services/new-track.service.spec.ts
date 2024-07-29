import { TestBed } from '@angular/core/testing';

import { NewTrackService } from './new-track.service';

describe('NewTrackService', () => {
  let service: NewTrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewTrackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
