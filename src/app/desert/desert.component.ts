// volcano.component.ts
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-desert',
  standalone: true,
  imports: [],
  template: `
    <div class="scene desert" role="region" aria-label="Desert scene">
      <video #video
        width="640"
        height="360"
        loop
        muted
        playsinline
        (click)="togglePlay()"
      >
        <source src="assets/videos/desert.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div class="overlay">
        <h1 class="title">Desert Dunes</h1>
        <p class="subtitle">Golden light, calm horizons</p>
        <button class="cta" (click)="playVideo()">Play Video</button>
      </div>
    </div>
  `,
  styleUrls: ['./desert.component.css']
})
export class DesertComponent implements AfterViewInit {
  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;

  constructor(private videoService: VideoService) {}

  ngAfterViewInit() {
    this.videoService.registerVideo(this.videoElement.nativeElement);
    // Start playing the first video (desert) by default
    if (window.location.pathname === '/') {
      this.videoElement.nativeElement.play().catch(e => {
        console.log('Autoplay prevented:', e);
      });
    }
  }

  togglePlay() {
    const video = this.videoElement.nativeElement;
    if (video.paused) {
      video.play().catch(e => {
        console.log('Play failed:', e);
        video.muted = true;
        video.play().catch(console.error);
      });
    } else {
      video.pause();
    }
  }

  playVideo() {
    this.videoElement.nativeElement.play().catch(e => {
      console.log('Play failed:', e);
      this.videoElement.nativeElement.muted = true;
      this.videoElement.nativeElement.play().catch(console.error);
    });
  }
}