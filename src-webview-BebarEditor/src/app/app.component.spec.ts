import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DatasetArrayPipe } from './dataset-array.pipe';
import { PartialsetArrayPipe } from './partialset-array.pipe';
import { HelpersetArrayPipe } from './helperset-array.pipe';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DatasetArrayPipe,
        PartialsetArrayPipe,
        HelpersetArrayPipe
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
