// src/app/services/video.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private videos: HTMLVideoElement[] = [];

  registerVideo(video: HTMLVideoElement) {
    this.videos.push(video);
    video.addEventListener('play', () => this.onVideoPlay(video));
  }

  private onVideoPlay(video: HTMLVideoElement) {
    // Pause all other videos when one plays
    this.videos.forEach(v => {
      if (v !== video && !v.paused) {
        v.pause();
      }
    });
  }
}