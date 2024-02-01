import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandesdashboardComponent } from './commandesdashboard.component';

describe('CommandesdashboardComponent', () => {
  let component: CommandesdashboardComponent;
  let fixture: ComponentFixture<CommandesdashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommandesdashboardComponent]
    });
    fixture = TestBed.createComponent(CommandesdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
