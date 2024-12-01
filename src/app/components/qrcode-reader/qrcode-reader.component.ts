import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import jsQR from 'jsqr';
import { Subscription } from 'rxjs';
import { ItemComponent } from '../item/item.component';

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
export class QRCodeReaderComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('canvas', { static: true }) canvasElement!: ElementRef<HTMLCanvasElement>;
  private _video: HTMLVideoElement = document.createElement("video");
  private _stream: MediaStream = new MediaStream();

  private _status: QRCodeReaderStatus = QRCodeReaderStatus.STAND_BY;

  private readonly _dialogRef = inject(MatDialogRef<QRCodeReaderComponent>);
  private readonly _dialog = inject(MatDialog);

  private _closeSub!: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.startReading();
    this._closeSub = this._dialogRef.beforeClosed().subscribe(() => {
      this._stream.getTracks().forEach(track => {
        track.stop();
      });
    });
  }

  ngAfterViewInit(): void {
    this.canvasElement.nativeElement?.getContext('2d', { willReadFrequently: true });
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
          this._status = QRCodeReaderStatus.FINISHED;
          const dialogRef = this._dialog.open(ItemComponent, {
            data: code.data
          });

          this.close();
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
