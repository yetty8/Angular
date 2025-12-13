import { Component } from '@angular/core';
import { OceanComponent } from './ocean/ocean.component';
import { DesertComponent } from './desert/desert.component';
import { VolcanoComponent } from './volcano/volcano.component';
import { WildlifeComponent } from './wildlife/wildlife.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    OceanComponent,
    DesertComponent,
    VolcanoComponent,
    WildlifeComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
