import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSyndicateComponent } from './add-syndicate.component';

describe('AddSyndicateComponent', () => {
  let component: AddSyndicateComponent;
  let fixture: ComponentFixture<AddSyndicateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSyndicateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSyndicateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
