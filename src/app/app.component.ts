import { Component, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'Nature by Yetbarek';
  @ViewChild('oceanVideo') oceanVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('volcanoVideo') volcanoVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('desertVideo') desertVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('wildlifeVideo') wildlifeVideo!: ElementRef<HTMLVideoElement>;

  currentSection: string = 'ocean';
  videoURLs = {
    ocean: 'https://res.cloudinary.com/dffqpwber/video/upload/v1765589683/ocean_ajxo0i.mp4',
    volcano: 'https://res.cloudinary.com/dffqpwber/video/upload/v1765589686/volcano_hjbgpi.mp4',
    desert: 'https://res.cloudinary.com/dffqpwber/video/upload/v1765589682/desert_z1vkbr.mp4',
    wildlife: 'https://res.cloudinary.com/dffqpwber/video/upload/v1765589691/wildlife.mp4'
  };

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const sections = ['ocean', 'volcano', 'desert', 'wildlife'];
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          this.currentSection = section;
          this.playCurrentVideo();
          break;
        }
      }
    }
  }

  ngAfterViewInit() {
    // Initialize by playing the first video
    this.playCurrentVideo();
  }

  scrollTo(section: string) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }

  togglePlay(video: HTMLVideoElement) {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  private playCurrentVideo() {
    // Pause all videos
    this.pauseAllVideos();
    
    // Play current section's video
    switch(this.currentSection) {
      case 'ocean':
        this.oceanVideo?.nativeElement?.play();
        break;
      case 'volcano':
        this.volcanoVideo?.nativeElement?.play();
        break;
      case 'desert':
        this.desertVideo?.nativeElement?.play();
        break;
      case 'wildlife':
        this.wildlifeVideo?.nativeElement?.play();
        break;
    }
  }

  private pauseAllVideos() {
    this.oceanVideo?.nativeElement?.pause();
    this.volcanoVideo?.nativeElement?.pause();
    this.desertVideo?.nativeElement?.pause();
    this.wildlifeVideo?.nativeElement?.pause();
  }
}

