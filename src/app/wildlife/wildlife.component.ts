import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wildlife',
  standalone: true,
  imports: [CommonModule],   // ✅ REQUIRED
  templateUrl: './wildlife.component.html',
  styleUrls: ['./wildlife.component.css']
})
export class WildlifeComponent {}
