import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsQR from 'jsqr';

enum QRCodeReaderStatus {
  STAND_BY,
  PROCESSING,
  FINISHED,
  ERROR
};

@Component({
  selector: 'app-qrcode-reader',
  imports: [],
  templateUrl: './qrcode-reader.component.html',
  styleUrls: ['./qrcode-reader.component.css'],
})
export class QRCodeReaderComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvasElement!: ElementRef<HTMLCanvasElement>;
  private _video: HTMLVideoElement = document.createElement("video");

  private _url: String = "";
  public get url() {
    return this._url;
  }

  private _status: QRCodeReaderStatus = QRCodeReaderStatus.STAND_BY;
  private _open: boolean = false;

  private _height: number = 480;
  public get height() {
    return this._height;
  }

  private _width: number = 640;
  public get width() {
    return this._width;
  }

  constructor() {
    
  }

  ngOnInit(): void {
    this.startReading();
  }

  private tickCamera(): void {
    if (this._video.readyState === this._video.HAVE_ENOUGH_DATA) {
      const canvas = this.canvasElement.nativeElement;

      canvas.height = this._video.videoHeight;
      canvas.width = this._video.videoWidth;

      const context = canvas.getContext('2d');

      if (context) {
        context.drawImage(this._video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });

        if (code && code.data) {
          console.log(code);
          this._url = code.data;
        } else {
        }
      }
    }

    requestAnimationFrame(() => this.tickCamera());
  }

  private startReading(): void {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(stream => {
      this._video.srcObject = stream;
      this._video.play();
      requestAnimationFrame(() => this.tickCamera());
    }).catch(error => {
      console.error("Erro ao acessar câmera: ", error);
      this._status = QRCodeReaderStatus.ERROR;
    });
  }
}
