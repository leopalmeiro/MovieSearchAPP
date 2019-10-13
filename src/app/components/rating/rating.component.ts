import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation
} from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-rating",
  templateUrl: "./rating.component.html",
  styleUrls: ["./rating.component.css"],
  encapsulation: ViewEncapsulation.Emulated
})
export class RatingComponent implements OnInit {
  @Input("rating") private rating: number;
  @Input("starCount") private starCount: number;
  @Input("movieId") private movieId: string;
  @Input("color") private color: string = "accent";
  @Output() private ratingUpdated = new EventEmitter();

  private snackBarDuration: number = 2000;
  private ratingArr = [];
  sessionId: string;
  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    console.log("a " + this.starCount);
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  addRating(rating: number): void {
    console.log(rating);

    this.apiService.getSessionID().subscribe(res => {
      this.sessionId = res["guest_session_id"];
      if (this.sessionId != "") {
        this.apiService.addRating(rating, this.movieId, this.sessionId).subscribe(add => {
          if(add["status_code"] == 1){
            this.snackBar.open(
              "You rated " + rating + " / " + this.starCount,
              "",
              {
                duration: this.snackBarDuration
              }
            );
            this.ratingUpdated.emit(rating);
          }
            
          });
      }
    });
  }
  /*  this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
      duration: this.snackBarDuration
          });
    this.ratingUpdated.emit(rating); */
  /* this.apiService.addRating(rating, this.movieId).subscribe(res => {

      console.log(JSON.stringify(res));
          this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
      duration: this.snackBarDuration
    });
    this.ratingUpdated.emit(rating);
    }); 
 */

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return "star";
    } else {
      return "star_border";
    }
  }
}

export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}
