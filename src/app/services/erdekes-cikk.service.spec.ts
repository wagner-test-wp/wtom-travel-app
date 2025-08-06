import { TestBed } from '@angular/core/testing';

import { ErdekesCikkService } from './erdekes-cikk.service';

describe('ErdekesCikkService', () => {
  let service: ErdekesCikkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErdekesCikkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
