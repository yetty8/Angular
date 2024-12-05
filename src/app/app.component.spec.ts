import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WildlifeComponent } from './wildlife/wildlife.component'; 
import { VolcanoComponent } from './volcano/volcano.component'; 
import { AppComponent } from './app.component';
import { OceanComponent } from './ocean/ocean.component'; 
import { DesertComponent } from './desert/desert.component'; 



@NgModule({
  declarations: [
    AppComponent,
    WildlifeComponent,
    VolcanoComponent,
    OceanComponent,
    DesertComponent
    
    
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }