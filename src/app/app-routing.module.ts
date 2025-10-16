import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
/*  {
    path: '',
    redirectTo: 'folder/inbox',
    pathMatch: 'full'
  },*/
  {
    path: '',
    redirectTo: 'travel',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'travel',
    loadChildren: () => import('./travel/travel.module').then( m => m.TravelPageModule)
  },
  {
    path: 'travel-details/:id',
    loadChildren: () => import('./travel-details/travel-details.module').then( m => m.TravelDetailsPageModule)
  },
  {
    path: 'erdekes-cikk',
    loadChildren: () => import('./erdekes-cikk/erdekes-cikk.module').then( m => m.ErdekesCikkPageModule)
  },
  {
    path: 'map/:day_id/:travel_id',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  },


 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
