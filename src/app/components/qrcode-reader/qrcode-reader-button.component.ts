import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { QRCodeReaderComponent } from './qrcode-reader.component';

@Component({
  selector: 'app-qrcode-reader-button',
  imports: [MatButtonModule, MatIconModule],
  template: `
    <button (click)="openDialog()" class="qrcode-reader-button" mat-fab aria-label="Botão para ler Códigos QR">
      <mat-icon fontIcon="qr_code_scanner" aria-label="Leitor de Código QR"></mat-icon>
    </button>
  `,
  styleUrls: ['./qrcode-reader.component.css'],
})
export class QRCodeReaderButtonComponent {
  private readonly dialog = inject(MatDialog);

  constructor() {
    
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(QRCodeReaderComponent);
  }
}
