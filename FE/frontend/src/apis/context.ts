export class Camera {
  video: HTMLVideoElement;
  source: HTMLSourceElement;
  constructor() {
    this.video = document.getElementById("video") as HTMLVideoElement;
    this.source = document.getElementById("currentVID") as HTMLSourceElement;
  }
}
