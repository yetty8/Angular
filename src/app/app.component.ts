import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule]
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('videoPlayer') videoRef!: ElementRef<HTMLVideoElement>;

  scenes = ['ocean', 'desert', 'volcano', 'wildlife'];
  currentIndex = 0;
  firstInteraction = false;

  // keep references so we can remove listeners later
  private onEnded = () => this.handleEnded();
  private onFirstClick = () => this.handleFirstInteraction();

  ngAfterViewInit() {
    const video = this.videoRef.nativeElement;

    video.playsInline = true;
    video.muted = true; // so autoplay works
    video.src = this.sceneSrc(this.scenes[this.currentIndex]);
    video.load();

    // try to autoplay (muted)
    this.safePlay(video);

    // advance automatically when current clip ends
    video.addEventListener('ended', this.onEnded);

    // unmute on first user click anywhere
    window.addEventListener('click', this.onFirstClick, { once: true });
  }

  ngOnDestroy() {
    // cleanup listeners
    const video = this.videoRef?.nativeElement;
    if (video) {
      video.removeEventListener('ended', this.onEnded);
    }
    window.removeEventListener('click', this.onFirstClick);
  }

  private sceneSrc(name: string) {
    return `assets/videos/${name}.mp4`;
  }

  private async safePlay(video: HTMLVideoElement) {
    try {
      await video.play();
    } catch (err) {
      // fallback: ensure muted and try again
      video.muted = true;
      try { await video.play(); } catch (e) { console.warn('Autoplay blocked', e); }
    }
  }

  private handleEnded() {
    // advance index, loop if needed
    this.currentIndex = (this.currentIndex + 1) % this.scenes.length;
    this.playCurrentWithFade();
  }

  private handleFirstInteraction() {
    const video = this.videoRef.nativeElement;
    // unmute but keep volume low to be friendly
    video.muted = false;
    video.volume = 0.9;
    this.firstInteraction = true;
  }

  select(scene: string) {
    const idx = this.scenes.indexOf(scene);
    if (idx === -1 || idx === this.currentIndex) return;

    this.currentIndex = idx;
    this.playCurrentWithFade();
  }

  private playCurrentWithFade() {
    const video = this.videoRef.nativeElement;

    // add fade-out and wait (matches CSS transition)
    video.classList.add('fade-out');

    // small timeout to match CSS; use loadedmetadata to remove fade once ready
    setTimeout(() => {
      // change source
      video.src = this.sceneSrc(this.scenes[this.currentIndex]);
      video.load();
      this.safePlay(video);

      // when video can play, remove fade so it fades in
      const onCanPlay = () => {
        video.classList.remove('fade-out');
        video.removeEventListener('canplay', onCanPlay);
      };
      video.addEventListener('canplay', onCanPlay);
    }, 600); // should match CSS transition-duration
  }

  // public helper if you want to start/stop externally
  playPauseToggle() {
    const video = this.videoRef.nativeElement;
    if (video.paused) this.safePlay(video);
    else video.pause();
  }
}
