import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriterComponent } from './writer.component';

describe('WriterComponent', () => {
  let component: WriterComponent;
  let fixture: ComponentFixture<WriterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
