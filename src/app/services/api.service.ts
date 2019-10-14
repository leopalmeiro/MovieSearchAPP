import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";

import { MovieList } from "src/app/models/movielist";
import { Movie } from "src/app/models/movie";
import { MoviesCollection } from "src/app/models/moviescollection";

import uuid from "uuidv4";

const apiUrl = "https://api.themoviedb.org/3";
const imagesUrl = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/";
const searchMethod = "/search/movie";
const searchIdMethod = "/movie/";
const sessionIdMethod = "/authentication/guest_session/new";
const ratingMethod = "/rating";
const api_key = "dbf9b95494d5df0da0fc6bca76ba85ff";
const keylocalStorage = "MoviesCollection";
let params = new HttpParams().set("api_key", api_key).set("language", "en-US");
let headers = new HttpHeaders()
  .set("Access-Control-Allow-Origin", "*")
  .set("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
  .set(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
const listCollections: MoviesCollection[] = [
  { id: uuid(), title: "Collection1", description: "Dr Nice", movies: [] },
  { id: uuid(), title: "Collection2", description: "Narco", movies: [] },
  { id: uuid(), title: "Collection3", description: "Bombasto", movies: [] },
  { id: uuid(), title: "Collection4", description: "Celeritas", movies: [] },
  { id: uuid(), title: "Collection5", description: "Magneta", movies: [] },
  { id: uuid(), title: "Collection6", description: "RubberMan", movies: [] },
  { id: uuid(), title: "Collection7", description: "Dynama", movies: [] },
  { id: uuid(), title: "Collection8", description: "Dr IQ", movies: [] },
  { id: uuid(), title: "Collection8", description: "Magma", movies: [] },
  { id: uuid(), title: "Collection9", description: "Tornado", movies: [] }
];

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

  getMoviesByFilter(filter: string, page: number): Observable<MovieList[]> {
    params = params.set("query", filter);
    params = params.set("page", page.toString());
    let url = apiUrl + searchMethod;
    console.log("getMoviesByFilter" + url + params);
    return this.http.get<MovieList[]>(url, { params }).pipe(
      tap(res => console.log(res)),
      catchError(this.handleError("getMoviesByFilter", []))
    );
  }

  getMovieById(id: string): Observable<Movie> {
    /* params = params.set("query", filter); */
    /*     params = params.set("movie_id", id); */
    let url = apiUrl + searchIdMethod + id;
    console.log("getMovieById link->" + url + params);
    return this.http.get<Movie>(url, { params }).pipe(
      tap(res => console.log("movie id=" + res)),
      catchError(this.handleError<Movie>(`getMovieById id=${id}`))
    );
  }

  addRating(
    rating: number,
    movieId: string,
    sessionId: string
  ): Observable<any> {
    //getsession
    //this.getSessionID();
    params = params.set("value", rating.toString());
    params = params.set("guest_session_id", sessionId);
    let url = apiUrl + searchIdMethod + movieId + ratingMethod;
    console.log("addRating link => " + url);
    console.log("addRating session => " + sessionId);
    return this.http.post<any>(url, { headers }, { params }).pipe(
      tap(res => console.log("addRating" + res)),
      catchError(this.handleError<any>("addProduto"))
    );
  }

  getSessionID(): Observable<string> {
    let url = apiUrl + sessionIdMethod;
    console.log("getSession " + url + params);
    return this.http.get<string>(url, { params }).pipe(
      tap(res => console.log("SessionID => " + res)),
      catchError(this.handleError<string>("SessionID"))
    );
  }

  getImagesUrl() {
    return imagesUrl;
  }

  //collectionsection
  getCollections(): MoviesCollection[] {
    let item: string[] = JSON.parse(localStorage.getItem(keylocalStorage));
    if (item === null) {
      localStorage.setItem(keylocalStorage, JSON.stringify(listCollections));
    } else {
      if (item.length === 0) {
        localStorage.setItem(keylocalStorage, JSON.stringify(listCollections));
      }
    }
    return JSON.parse(localStorage.getItem(keylocalStorage));
  }

  addCollection(moviescollection: MoviesCollection): void {
    let list: MoviesCollection[] = [];
    let listStored: MoviesCollection[] = JSON.parse(
      localStorage.getItem(keylocalStorage)
    );
    list.push(moviescollection);

    for (let i = 0; i < listStored.length; i++) {
      const element = listStored[i];
      list.push(element);
    }
    localStorage.setItem(keylocalStorage, JSON.stringify(list));
  }

  editCollection(moviescollection: MoviesCollection) {
    let list: MoviesCollection[] = [];
    let listStored: MoviesCollection[] = JSON.parse(
      localStorage.getItem(keylocalStorage)
    );
    for (let i = 0; i < listStored.length; i++) {
      const element = listStored[i];
      if (moviescollection.id == element[i].id) {
        element[i] = moviescollection;
      }
      list.push(element);
    }
    localStorage.setItem(keylocalStorage, JSON.stringify(list));
  }

  deleteCollections(id: string): MoviesCollection[] {
    let list: MoviesCollection[] = [];
    let listStored: MoviesCollection[] = JSON.parse(
      localStorage.getItem(keylocalStorage)
    );
    listStored = listStored.filter(item => item.id !== id);
    localStorage.setItem(keylocalStorage, JSON.stringify(listStored));
    return JSON.parse(localStorage.getItem(keylocalStorage));
  }
}
