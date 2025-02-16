import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Item } from "src/app/interfaces/item";

@Component({
  selector: 'app-share',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  template: `
    <button mat-fab role="button" matTooltip="Compartilhar Item" class="share-button" [disabled]="!ready"
      (click)="share()">
      <mat-icon>share</mat-icon>
    </button>
  `,
  styles: `
    .share-button {
      box-shadow: none;
      margin-right: 5px;
    }

    .share-button:not(:disabled) {
      background-color: var(--mat-sys-primary);
      color: white;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShareComponent {
  private _item: Item = { id: -1, description: "", manufacturer: "", name: "", year: -1 };
  public get item() { return this._item; }
  @Input()
  public set item(i: Item) {
    this._item = i;
    this._shareData = {
      title: i.name,
      text: `Conheça o item: ${i.name}! Visite o MUTEC - Museu de Tecnologias do Campus Curitiba da UTFPR`,
      url: `${window.location.origin}/?shared=${i.id}`
    };

    this.cdr.detectChanges();
  }

  private _ready: boolean = false;
  public get ready() { return this._ready; }
  @Input()
  public set ready(r: boolean) {
    this._ready = r;
    this.cdr.detectChanges();
  }

  private _shareData: ShareData = {};

  private _snackBar = inject(MatSnackBar);
  
  constructor(private cdr: ChangeDetectorRef) { }

  public share(): void {
    try {
      console.log(this._shareData);
      navigator.share(this._shareData).then(() => {
        this._snackBar.open('Item compartilhado com sucesso!', 'Fechar', {
          duration: 3000
        });
      });
    } catch (err) {
      console.error(err);
      this._snackBar.open('Houve um erro ao tentar compartilhar item', 'Fechar', {
        duration: 3000
      });
    }
  }
}