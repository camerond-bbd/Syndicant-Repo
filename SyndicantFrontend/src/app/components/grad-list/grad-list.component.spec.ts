import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradListComponent } from './grad-list.component';

describe('GradListComponent', () => {
  let component: GradListComponent;
  let fixture: ComponentFixture<GradListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
