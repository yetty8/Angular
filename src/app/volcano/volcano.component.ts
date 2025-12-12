import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-volcano',
  templateUrl: './volcano.component.html',
  styleUrls: ['./volcano.component.css']
})
export class VolcanoComponent implements AfterViewInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  videoSource = 'assets/videos/volcano.mp4';
  videoError = false;

  ngAfterViewInit() {
    const video = this.videoPlayer.nativeElement;
    
    // Log video events for debugging
    video.addEventListener('error', (e) => {
      console.error('Video error:', video.error);
      this.videoError = true;
    });

    video.addEventListener('canplay', () => {
      console.log('Video can play');
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Autoplay prevented:', error);
          video.muted = true;
          video.play().catch(e => console.log('Still cannot play:', e));
        });
      }
    });
  }
}