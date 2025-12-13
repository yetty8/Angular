import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { OceanComponent } from './ocean/ocean.component';
import { DesertComponent } from './desert/desert.component';
import { VolcanoComponent } from './volcano/volcano.component';
import { WildlifeComponent } from './wildlife/wildlife.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    OceanComponent,
    DesertComponent,
    VolcanoComponent,
    WildlifeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }