import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WildlifeComponent } from './wildlife/wildlife.component';
import { VolcanoComponent } from './volcano/volcano.component';
import { OceanComponent } from './ocean/ocean.component';
import { DesertComponent } from './desert/desert.component';

const routes: Routes = [
  { path: 'wildlife', component: WildlifeComponent },
  { path: 'volcano', component: VolcanoComponent },
  { path: 'ocean', component: OceanComponent },
  { path: 'desert', component: DesertComponent },
  { path: '', redirectTo: '/wildlife', pathMatch: 'full' } // Redirect to wildlife by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }