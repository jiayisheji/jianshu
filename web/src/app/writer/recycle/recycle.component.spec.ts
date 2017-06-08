import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecycleComponent } from './recycle.component';

describe('RecycleComponent', () => {
  let component: RecycleComponent;
  let fixture: ComponentFixture<RecycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
