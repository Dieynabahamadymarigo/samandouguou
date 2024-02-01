import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeconnexionclientComponent } from './deconnexionclient.component';

describe('DeconnexionclientComponent', () => {
  let component: DeconnexionclientComponent;
  let fixture: ComponentFixture<DeconnexionclientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeconnexionclientComponent]
    });
    fixture = TestBed.createComponent(DeconnexionclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
