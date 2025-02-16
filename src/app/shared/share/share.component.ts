import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Item } from "src/app/interfaces/item";
import { ShareButtons } from 'ngx-sharebuttons/buttons';

@Component({
  selector: 'app-share',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, ShareButtons],
  template: `
    <share-buttons [show]="4" [url]="shareData.url ?? location" [title]="shareData.title ?? 'Compartilhar'"
      [description]="shareData.text ?? 'Venha visitar o MUTEC - Museu de Tecnologias do Campus Curitiba da UTFPR'"
      [include]="socialNets" class="share-buttons"></share-buttons>
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

    .share-buttons {
      display: none;
    }

    @media (min-width: 768px) {
      .share-button {
        display: none;
      }
      .share-buttons {
        display: block;
      }
    }

    ::ng-deep .sb-default .sb-wrapper {
      --sb-border-radius: 16px;
    }
    ::ng-deep .sb-default .sb-wrapper::before {
      content: "";
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      position: absolute;
      pointer-events: none;
      border-radius: inherit;

      background-color: var(--mat-fab-state-layer-color, var(--mat-sys-on-primary-container));
      opacity: 0;
      z-index: 1;
    }
    ::ng-deep .sb-default .sb-wrapper:hover::before {
      opacity: var(--mat-fab-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
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
      text: `Conheça o item: ${i.name}!\nVisite o MUTEC - Museu de Tecnologias do Campus Curitiba da UTFPR`,
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
  public get shareData() { return this._shareData; }

  public location: string = window.location.origin;
  public readonly socialNets: Array<string> = [
    'x',
    'whatsapp',
    'messenger',
    'copy',
    'telegram',
    'facebook',
    // 'tumblr',
    // 'linkedin',
    'email',
    'sms',
    'print',
  ];

  private _snackBar = inject(MatSnackBar);
  
  constructor(private cdr: ChangeDetectorRef) { }

  public share(): void {
    try {
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