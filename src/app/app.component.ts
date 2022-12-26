import { Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { tap } from "rxjs/operators";
import { HackerNewsApiService as HackerNewsApiService } from "./hacker-news-api.service";
import { Title } from '@angular/platform-browser';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})

export class AppComponent {
  newsStories: Array<any>;
  displayedColumns = ["storyTitle", "link"];
  dataSource: MatTableDataSource<any>;

  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private hackerNewsApi: HackerNewsApiService, public title: Title) {
    this.title.setTitle('NTHackerNewsFE');
}

  ngOnInit() {
    this.loadStories();
  }

  loadStories() {
    return this.hackerNewsApi
      .getLatestStories()
      .pipe(tap(data => {
        this.newsStories = <Array<any>>data;
      }));
  }

  ngAfterViewInit() {
    this.loadStories().subscribe(_ => {
      this.dataSource = new MatTableDataSource(this.newsStories);
      this.dataSource.paginator = this.paginator;

    });
  }

  search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
