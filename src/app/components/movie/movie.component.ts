import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ModalComponent } from '../modal/modal.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movieId = "";

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(param => {
      this.movieId = param["id"]; 
    });
   }

  ngOnInit() {
    this.openDialog();
  }

 openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '60vw',
      
      data: {id: this.movieId} 
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['home']);
    });
   }
}
