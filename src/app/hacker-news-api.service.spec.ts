import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { HackerNewsApiService } from './hacker-news-api.service';
let httpClientSpy: jasmine.SpyObj<HttpClient>;
let hackerNewsService: HackerNewsApiService;
describe('HackerNewsApiService', () => {
  beforeEach(() => {
    // TODO: spy on other methods too
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    hackerNewsService = new HackerNewsApiService(httpClientSpy);
  });

  it('should return expected array of news stories (HttpClient called once)', (done: DoneFn) => {
    const expectedStories: Array<any> =
      [{ title: '', url: 'A' }, { title: '', url: 'B' }];

    httpClientSpy.get.and.returnValue(of(expectedStories));

    hackerNewsService.getLatestStories().subscribe({
      next: stories => {
        expect(stories)
          .withContext('expected stories')
          .toEqual(expectedStories);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });


});