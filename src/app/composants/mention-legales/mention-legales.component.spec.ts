import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionLegalesComponent } from './mention-legales.component';
import { HttpClientModule } from '@angular/common/http';

describe('MentionLegalesComponent', () => {
  let component: MentionLegalesComponent;
  let fixture: ComponentFixture<MentionLegalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MentionLegalesComponent],
      imports: [HttpClientModule],
    });
    fixture = TestBed.createComponent(MentionLegalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
