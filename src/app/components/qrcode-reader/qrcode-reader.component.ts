import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import jsQR from 'jsqr';
import { Subscription } from 'rxjs';

enum QRCodeReaderStatus {
  STAND_BY,
  PROCESSING,
  FINISHED,
  ERROR
};

@Component({
  selector: 'app-qrcode-reader',
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './qrcode-reader.component.html',
  styleUrls: ['./qrcode-reader.component.css'],
})
export class QRCodeReaderComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasElement!: ElementRef<HTMLCanvasElement>;
  private _video: HTMLVideoElement = document.createElement("video");
  private _stream: MediaStream = new MediaStream();

  private _url: string = "";
  public get url() {
    return this._url;
  }

  private _status: QRCodeReaderStatus = QRCodeReaderStatus.STAND_BY;

  private _height: number = 480;
  public get height() {
    return this._height;
  }

  private _width: number = 640;
  public get width() {
    return this._width;
  }

  private readonly _dialogRef = inject(MatDialogRef<QRCodeReaderComponent>);
  private _closeSub!: Subscription;

  constructor() {
    
  }

  ngOnInit(): void {
    this.startReading();
    this._closeSub = this._dialogRef.beforeClosed().subscribe(() => {
      this._stream.getTracks().forEach(track => {
        track.stop();
      });
    });
  }

  ngOnDestroy(): void {
    this._closeSub.unsubscribe();
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
          this._status = QRCodeReaderStatus.FINISHED;
        }
      }
    }

    requestAnimationFrame(() => this.tickCamera());
  }

  private startReading(): void {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(stream => {
      this._stream = stream;
      this._video.srcObject = this._stream;
      this._video.play();
      requestAnimationFrame(() => this.tickCamera());
    }).catch(error => {
      console.error("Erro ao acessar câmera: ", error);
      this._status = QRCodeReaderStatus.ERROR;
    });
  }

  close(): void {
    this._dialogRef.close();
  }
}
