import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandesdashboardComponent } from './commandesdashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { AppModule } from 'src/app/app.module';

describe('CommandesdashboardComponent', () => {
  let component: CommandesdashboardComponent;
  let fixture: ComponentFixture<CommandesdashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommandesdashboardComponent],
      imports: [
        HttpClientModule,
        AppModule
      ],
    });
    fixture = TestBed.createComponent(CommandesdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    
  });
});
