import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegumesComponent } from './legumes.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('LegumesComponent', () => {
  let component: LegumesComponent;
  let fixture: ComponentFixture<LegumesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LegumesComponent],
      imports: [HttpClientModule,FormsModule],
    });
    fixture = TestBed.createComponent(LegumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
