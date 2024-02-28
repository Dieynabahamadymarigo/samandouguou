import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashLivreurComponent } from './dash-livreur.component';
import { HttpClientModule } from '@angular/common/http';

describe('DashLivreurComponent', () => {
  let component: DashLivreurComponent;
  let fixture: ComponentFixture<DashLivreurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashLivreurComponent],
      imports: [HttpClientModule],
    });
    fixture = TestBed.createComponent(DashLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
