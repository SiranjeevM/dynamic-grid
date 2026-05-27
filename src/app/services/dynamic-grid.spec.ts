import { TestBed } from '@angular/core/testing';

import { DynamicGrid } from './dynamic-grid';

describe('DynamicGrid', () => {
  let service: DynamicGrid;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicGrid);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
