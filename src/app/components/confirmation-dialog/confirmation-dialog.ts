import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

/**
 * @title Dialog Animations
 */
@Component({
  selector: 'confirmation-dialog',
  styleUrl: 'confirmation-dialog.css',
  templateUrl: 'button-dialog.html',
  imports: [MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogButton {
  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ConfirmationDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'confirmation-dialog.html',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialog {
  readonly dialogRef = inject(MatDialogRef<ConfirmationDialog>);
}