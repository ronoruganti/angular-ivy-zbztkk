import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })

export class HackerNewsApiService {

  constructor(private http: HttpClient) { }

  getLatestStories() {
    return this.http.get(environment.apiUrl);
  }
} 
