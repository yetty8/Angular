import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-volcano',
  standalone: true,
  imports: [CommonModule],   // ✅ REQUIRED
  templateUrl: './volcano.component.html',
  styleUrls: ['./volcano.component.css']
})
export class VolcanoComponent {}
