import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-volcano',
  templateUrl: './volcano.component.html',
  styleUrls: ['./volcano.component.css']
})
export class VolcanoComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  videoSource: string = 'assets/videos/volcano.mp4';

  constructor() {}

  ngOnInit(): void {
    // This will be handled by the template's (load) event
  }

  onVideoLoad() {
    const video = this.videoPlayer.nativeElement;
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // Autoplay was prevented, show a play button
        console.log('Autoplay prevented:', error);
        video.muted = true; // Ensure video is muted
        video.play().catch(e => console.log('Still cannot play:', e));
      });
    }
  }
}