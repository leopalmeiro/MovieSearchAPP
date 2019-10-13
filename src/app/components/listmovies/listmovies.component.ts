import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";

import { MovieList } from "src/app/models/movielist";
import { ApiService } from "src/app/services/api.service";
import {ActivatedRoute, Router} from '@angular/router';



/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-listmovies",
  templateUrl: "./listmovies.component.html",
  styleUrls: ["./listmovies.component.css"]
})
export class ListmoviesComponent implements OnInit {

  displayedColumns = ["poster", "title", "voteAverage"];
  dataSource = new MatTableDataSource<MovieList>();
  apiUrl = "";
  hasNoResult: boolean = false;
  matcher = new MyErrorStateMatcher();
  showTable: boolean = false;
  //pagination control
  pageIndex: number = 0;
  pageSize: number = 20;
  totalPages: number = 0;
  length: number = 0;
  page: number = 0;

  //input filter control
  filter = new FormControl("", [
    Validators.minLength(4),
    Validators.pattern("^[a-zA-Z0-9 '-]+$")
  ]);

  //viewChild controls
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.apiUrl = this.apiService.getImagesUrl();
  }

  getMoviesByFilter = (filter: string, page: number) => {
    this.dataSource = new MatTableDataSource<MovieList>();

    this.apiService.getMoviesByFilter(filter, page).subscribe(res => {
      if (res["results"].length > 0) {
        this.dataSource.data = res["results"] as MovieList[];
        this.pageIndex = res["page"];
        this.length = res["total_results"];
        this.totalPages = res["total_pages"];
        this.dataSource.sort = this.sort;
        this.showTable = true;
        this.hasNoResult = false;
      } else {
        this.showTable = false;
        this.hasNoResult = true;
      }
    });
  };

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  doFilter(): void {
    if (this.filter.value !== "") {
      if (this.filter.errors === null) {
        this.getMoviesByFilter(this.filter.value, 1);
      } else {
        this.showTable = false;
      }
    }
  }

  pageChanged($event): void {
    this.page = parseInt($event.pageIndex) + 1;
    this.getMoviesByFilter(this.filter.value, this.page);
  }
  openDialog(row) {
    this.router.navigate(['movie', row.id]);
  }

  
}
