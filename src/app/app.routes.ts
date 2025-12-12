import { Routes } from '@angular/router';
import { OceanComponent } from './ocean/ocean.component';
import { VolcanoComponent } from './volcano/volcano.component';
import { DesertComponent } from './desert/desert.component';
import { WildlifeComponent } from './wildlife/wildlife.component';

export const routes: Routes = [
  { path: '', component: OceanComponent },
  { path: 'volcano', component: VolcanoComponent },
  { path: 'desert', component: DesertComponent },
  { path: 'wildlife', component: WildlifeComponent },
  { path: '**', redirectTo: '' }
];