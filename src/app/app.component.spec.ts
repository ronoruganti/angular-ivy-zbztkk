import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { HackerNewsApiService as HackerNewsApiService } from "./hacker-news-api.service";

describe('AppComponent', () => {  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    //debugger;

    expect(app).toBeTruthy();
  });

  it(`should have as title 'NTHackerNewsFE'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    //debugger;
    expect(app.title.getTitle()).toEqual('NTHackerNewsFE');
  });

});