import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicGrid } from './dynamic-grid';

describe('DynamicGrid', () => {
  let component: DynamicGrid;
  let fixture: ComponentFixture<DynamicGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
