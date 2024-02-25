import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditViewUserComponent } from './edit-view-user.component';

describe('EditViewUserComponent', () => {
  let component: EditViewUserComponent;
  let fixture: ComponentFixture<EditViewUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditViewUserComponent]
    });
    fixture = TestBed.createComponent(EditViewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
