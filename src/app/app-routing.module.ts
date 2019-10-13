import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListmoviesComponent} from './components/listmovies/listmovies.component';
import {MovieComponent} from './components/movie/movie.component';
import {CollectionlistComponent} from './components/collections/collectionlist/collectionlist.component';
import {CollectionaddComponent} from './components/collections/collectionadd/collectionadd.component';

const routes: Routes = [
   {
      path: 'home',
      component: ListmoviesComponent
    },
    {
      path: 'movie/:id',
      component: MovieComponent
    },
    {
      path: 'collections',
      component: CollectionlistComponent
    },
    {
      path: 'addcollections',
      component: CollectionaddComponent
    },
    {
      path: 'editcollections/:id',
      component: CollectionaddComponent
    },
    { 
      path: '**', // bonus: all routes not defined forward to /home
      redirectTo: 'home'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
