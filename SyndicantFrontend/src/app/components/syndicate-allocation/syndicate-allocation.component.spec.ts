import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyndicateAllocationComponent } from './syndicate-allocation.component';

describe('SyndicateAllocationComponent', () => {
  let component: SyndicateAllocationComponent;
  let fixture: ComponentFixture<SyndicateAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyndicateAllocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SyndicateAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
