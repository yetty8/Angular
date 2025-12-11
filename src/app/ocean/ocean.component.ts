import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ocean',
  standalone: true,
  imports: [CommonModule],   // ✅ REQUIRED
  templateUrl: './ocean.component.html',
  styleUrls: ['./ocean.component.css']
})
export class OceanComponent {}
