import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErdekesCikkPage } from './erdekes-cikk.page';

describe('ErdekesCikkPage', () => {
  let component: ErdekesCikkPage;
  let fixture: ComponentFixture<ErdekesCikkPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ErdekesCikkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
