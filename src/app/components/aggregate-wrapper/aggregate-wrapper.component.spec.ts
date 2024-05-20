import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityWrapperComponent } from './aggregate-wrapper.component';

describe('EntityWrapperComponent', () => {
  let component: EntityWrapperComponent;
  let fixture: ComponentFixture<EntityWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityWrapperComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EntityWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
