import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { MoviesCollection } from "src/app/models/moviescollection";
import { ApiService } from "src/app/services/api.service";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";

import uuid from "uuidv4";

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
  selector: "app-collectionadd",
  templateUrl: "./collectionadd.component.html",
  styleUrls: ["./collectionadd.component.css"]
})
export class CollectionaddComponent implements OnInit {
  titleFormControl = new FormControl("", [Validators.required]);
  descriptionFormControl = new FormControl("", [Validators.required]);

  matcher = new MyErrorStateMatcher();

  moviecollection: MoviesCollection = new MoviesCollection();
  listCollections: MoviesCollection[];
  private snackBarDuration: number = 2000;

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {}

  save() {
    if (!this.titleFormControl.hasError("required") && !this.descriptionFormControl.hasError("required")) {
      //localStorage.setItem(key, JSON.stringify(myObj));
      this.moviecollection = {
        id: uuid(),
        title: this.titleFormControl.value,
        description: this.descriptionFormControl.value,
        movies: []
      };
      this.apiService.addCollection(this.moviecollection);
      this.snackBar.open("Collection has been Add.", "", {
        duration: this.snackBarDuration
      });
      this.router.navigate(["/collections"]);
    }
  }
}
