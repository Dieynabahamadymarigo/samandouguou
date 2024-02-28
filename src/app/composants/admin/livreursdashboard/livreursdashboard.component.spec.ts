import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreursdashboardComponent } from './livreursdashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { AppModule } from 'src/app/app.module';

describe('LivreursdashboardComponent', () => {
  let component: LivreursdashboardComponent;
  let fixture: ComponentFixture<LivreursdashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LivreursdashboardComponent],
      imports: [HttpClientModule,AppModule],
    });
    fixture = TestBed.createComponent(LivreursdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
