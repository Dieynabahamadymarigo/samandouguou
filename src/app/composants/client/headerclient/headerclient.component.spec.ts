import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderclientComponent } from './headerclient.component';
import { HttpClientModule } from '@angular/common/http';

describe('HeaderclientComponent', () => {
  let component: HeaderclientComponent;
  let fixture: ComponentFixture<HeaderclientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderclientComponent],
      imports: [HttpClientModule],
    });
    fixture = TestBed.createComponent(HeaderclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
