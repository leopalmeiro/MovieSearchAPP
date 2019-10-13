import { Component, OnInit, ViewChild } from "@angular/core";

import { MoviesCollection } from "src/app/models/moviescollection";
import { ApiService } from "src/app/services/api.service";
import { MatSnackBar, MatTableDataSource, MatSort } from "@angular/material";

@Component({
  selector: "app-collectionlist",
  templateUrl: "./collectionlist.component.html",
  styleUrls: ["./collectionlist.component.css"]
})
export class CollectionlistComponent implements OnInit {
  datasource = new MatTableDataSource<MoviesCollection>();

  displayedColumns: string[] = ["action", "id", "title", "description"];
  @ViewChild(MatSort) sort: MatSort;
  private snackBarDuration: number = 2000;

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {
    //localStorage.setItem(this.key, JSON.stringify(this.listCollections));
  }

  ngOnInit() {
    this.datasource.data = this.apiService.getCollections();
    this.datasource.sort = this.sort;
  }

  deleteCollection(id) {
    this.datasource.data = this.apiService.deleteCollections(id);
    this.snackBar.open(
      "Collection has been deleted." + id,
      "",
      {
        duration: this.snackBarDuration
      }
    );
  }

  editCollection(id) {
    alert("Not Work");
  }
}
