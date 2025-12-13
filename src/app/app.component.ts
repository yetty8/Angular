export class AppComponent {
  title = 'Nature by Yetbarek';

  scenes: string[] = ['desert', 'ocean', 'volcano', 'wildlife'];

  videoURLs: Record<string, string> = {
    desert: 'https://res.cloudinary.com/dffqpwber/video/upload/v1765589682/desert_z1vkbr.mp4',
    ocean: 'https://res.cloudinary.com/dffqpwber/video/upload/v1765589683/ocean_ajxo0i.mp4',
    volcano: 'https://res.cloudinary.com/dffqpwber/video/upload/v1765589686/volcano_hjbgpi.mp4',
    wildlife: 'https://res.cloudinary.com/dffqpwber/video/upload/v1765589691/wildlife.mp4'
  };

  toggleVideo(scene: string) {
    const video = document.getElementById('video-' + scene) as HTMLVideoElement;
    if (video) {
      video.paused ? video.play() : video.pause();
    }
  }
}
