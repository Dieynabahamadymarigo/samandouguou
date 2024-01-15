import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionLegalesComponent } from './mention-legales.component';

describe('MentionLegalesComponent', () => {
  let component: MentionLegalesComponent;
  let fixture: ComponentFixture<MentionLegalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MentionLegalesComponent]
    });
    fixture = TestBed.createComponent(MentionLegalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
