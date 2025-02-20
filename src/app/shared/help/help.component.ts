import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDividerModule } from "@angular/material/divider";

@Component({
  selector: 'app-help',
  imports: [
    CommonModule,
    MatDialogModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css'],
})
export class HelpComponent {
  private readonly _dialogRef = inject(MatDialogRef<HelpComponent>);

  public close(): void {
    this._dialogRef.close();
  }
}

@Component({
  selector: 'app-help-button',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  template: `
    <button mat-mini-fab (click)="openHelp()" matTooltip="Abrir Ajuda" matTooltipPosition="left"
      class="help-button" aria-labelledby="abrir_ajuda">
      <label id="abrir_ajuda" class="d-none">Abrir ajuda</label>
      <mat-icon>help</mat-icon>
    </button>
  `,
  styleUrls: ['./help.component.css'],
})
export class HelpButtonComponent {
  private readonly _dialog = inject(MatDialog);
  
  public openHelp(): void {
    this._dialog.open(HelpComponent);
  }
}