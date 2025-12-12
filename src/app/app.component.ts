// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  scenes = ['ocean', 'volcano', 'desert', 'wildlife'];
  activeVideo: string | null = null;

  toggleVideo(scene: string) {
    const video = document.getElementById(`video-${scene}`) as HTMLVideoElement;
    if (video.paused) {
      // Pause all other videos
      this.scenes.forEach(s => {
        if (s !== scene) {
          const v = document.getElementById(`video-${s}`) as HTMLVideoElement;
          if (v) v.pause();
        }
      });
      video.play();
    } else {
      video.pause();
    }
  }
}