import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DesertComponent} from './desert/desert.component';
import { WildlifeComponent} from './wildlife/wildlife.component';
import {VolcanoComponent} from './volcano/volcano.component';
import { OceanComponent} from './ocean/ocean.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,DesertComponent,WildlifeComponent,VolcanoComponent,OceanComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'natureAnimations';
}
