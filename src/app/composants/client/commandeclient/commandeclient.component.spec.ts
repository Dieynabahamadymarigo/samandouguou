import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeclientComponent } from './commandeclient.component';
import { HttpClientModule } from '@angular/common/http';
import { AppModule } from 'src/app/app.module';

describe('CommandeclientComponent', () => {
  let component: CommandeclientComponent;
  let fixture: ComponentFixture<CommandeclientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommandeclientComponent],
      imports: [HttpClientModule, AppModule],
    });
    fixture = TestBed.createComponent(CommandeclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
