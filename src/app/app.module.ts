import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MaterialModule } from "./material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule } from "@angular/common/http";

import { MatIconModule } from "@angular/material/icon";
import { ListmoviesComponent } from "./components/listmovies/listmovies.component";
import { ApiService } from "./services/api.service";
import { ModalComponent } from "./components/modal/modal.component";
import "hammerjs";
import { MovieComponent } from './components/movie/movie.component';
import { RatingComponent } from './components/rating/rating.component';
import { CollectionlistComponent } from './components/collections/collectionlist/collectionlist.component';
import { CollectionaddComponent } from './components/collections/collectionadd/collectionadd.component';


@NgModule({
  declarations: [AppComponent, ListmoviesComponent, ModalComponent, MovieComponent, RatingComponent, CollectionlistComponent, CollectionaddComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule {}
