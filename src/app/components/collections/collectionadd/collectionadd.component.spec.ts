import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionaddComponent } from './collectionadd.component';

describe('CollectionaddComponent', () => {
  let component: CollectionaddComponent;
  let fixture: ComponentFixture<CollectionaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
