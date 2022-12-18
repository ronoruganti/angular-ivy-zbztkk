import { Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { map, tap } from "rxjs/operators";
import { NewsApiService } from "./news-api.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  mArticles: Array<any>;
  displayedColumns = ["articleTitle", "link"];
  dataSource: MatTableDataSource<any>;

  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private newsapi: NewsApiService) {
  }

  ngOnInit() {
    //load articles
    this.loadArticles();
  }

  loadArticles() {
    return this.newsapi
      .initArticles()
      .pipe(map(data => {
        this.mArticles = data["articles"]
      }));
  }

  ngAfterViewInit() {
    this.loadArticles().subscribe(_ => {
      console.log(this.mArticles.length);
      this.dataSource = new MatTableDataSource(this.mArticles);
      this.dataSource.paginator = this.paginator;
    });
  }

  searchArticles(source) {
    console.log("selected source is: " + source);
    this.newsapi
      .getArticlesByID(source)
      .subscribe((data) => (this.mArticles = data["articles"]));
  }

  //   loadLessonsPage() {
  //     this.loadArticles(
  //         this.art,
  //         '',
  //         'asc',
  //         this.paginator.pageIndex,
  //         this.paginator.pageSize);
  // }
}
