import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryGalleryComponent } from './category-gallery.component';

describe('CategoryGalleryComponent', () => {
  let component: CategoryGalleryComponent;
  let fixture: ComponentFixture<CategoryGalleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryGalleryComponent]
    });
    fixture = TestBed.createComponent(CategoryGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
