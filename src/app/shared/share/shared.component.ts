import { Component, inject, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ItemComponent } from "src/app/components/item/item.component";

@Component({
  selector: 'app-shared',
  template: '',
})
export class SharedComponent implements OnDestroy {
  private _dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  private _sub: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) {
    this._sub = this.route.queryParams.subscribe(param => {
      const id = param['shared'];
      if (id)
        this.accessShared(id);
    });
  }

  private accessShared(id: number): void {
    this.router.navigate(['']).then(
      () => {
        const dialogRef = this._dialog.open(ItemComponent, {
          data: id
        });
      },
      error => {
        this._snackBar.open('Houve um erro ao abrir item compartilhado', 'Fechar', {
          duration: 3000
        });
      }
    );
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}