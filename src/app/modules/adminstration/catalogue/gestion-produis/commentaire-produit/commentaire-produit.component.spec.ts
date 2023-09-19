import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentaireProduitComponent } from './commentaire-produit.component';

describe('CommentaireProduitComponent', () => {
  let component: CommentaireProduitComponent;
  let fixture: ComponentFixture<CommentaireProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentaireProduitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentaireProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
