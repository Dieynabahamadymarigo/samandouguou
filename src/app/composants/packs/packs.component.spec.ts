import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacksComponent } from './packs.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('PacksComponent', () => {
  let component: PacksComponent;
  let fixture: ComponentFixture<PacksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PacksComponent],
      imports: [HttpClientModule,FormsModule],
    });
    fixture = TestBed.createComponent(PacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
