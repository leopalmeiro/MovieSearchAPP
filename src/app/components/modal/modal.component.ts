import {
  Component,
  OnInit,
  Inject,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation
} from "@angular/core";

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { Movie } from "src/app/models/movie";
import { ApiService } from "src/app/services/api.service";
import { StarRatingColor } from "../rating/rating.component";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"]
})
export class ModalComponent implements OnInit {
  movie: Movie;
  apiUrl = "";

  rating: number = 0;
  starCount: number = 10;
  starColor: StarRatingColor = StarRatingColor.accent;
  starColorP: StarRatingColor = StarRatingColor.primary;
  starColorW: StarRatingColor = StarRatingColor.warn;
  movieId : string;

  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.apiUrl = this.apiService.getImagesUrl();
  }

  getMovieById = (id: string) => {
    this.apiService.getMovieById(id).subscribe(res => {
      this.movie = res;
      this.movieId = res.id;
      console.log(JSON.stringify(res));
      console.log(JSON.stringify(this.movie));
    });
  };

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.getMovieById(this.data.id);
  }

  onRatingChanged(rating) {
    console.log(rating);
    this.rating = rating;
  }
}
