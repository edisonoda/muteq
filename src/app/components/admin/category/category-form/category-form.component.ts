import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { Item } from 'src/app/interfaces/item';
import { SearchService } from 'src/app/services/search.service';
import { Subscription } from 'rxjs';
import { AdmService } from 'src/app/services/adm.service';

@Component({
  selector: 'app-category-form',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule, MatSelectModule],
  templateUrl: './category-form.component.html',
  styleUrls: ['../../form.css']
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  private readonly _snackBar = inject(MatSnackBar);

  private _title: string = 'Cadastrar Categoria';
  public get title() { return this._title; }
  public set title(t: string) { this._title = t; }

  private _form: FormGroup = this.blankForm();
  public get form() {
    return this._form;
  }

  private _items: Array<Item> = [];
  public get items() { return this._items; }
  public set items(i: Array<Item>) { this._items = i; }

  private _subs: Array<Subscription> = [];

  constructor(
    private searchService: SearchService,
    private admService: AdmService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this._subs.push(
      // Verifica se vai editar alguma categoria (possui id na url)
      this.route.params.subscribe(params => {
        const id = parseInt(params['id']);

        if (!isNaN(id))
          this._form = this.blankForm(id);
        else
          this._form = this.blankForm();
      }),
      // Verifica se alterou os filtros, pois não altera instancia um novo ao mudar de rota
      this.router.events.subscribe(ev => {
        if (ev instanceof NavigationEnd && this.form.get('id')?.value)
          this.getCategory();
      })
    );
  }

  ngOnInit(): void {
    this.searchService.getItems().subscribe(res => {
      if (res)
        this.items = res.elements;
    });
  }

  private blankForm(id?: number): FormGroup {
    this.title = id ? 'Editar Categoria' : 'Cadastrar Categoria';

    return new FormGroup({
      id: new FormControl(id ?? null),
      name: new FormControl('', [Validators.required]),
      img: new FormControl('', [Validators.required]),
      items: new FormControl([])
    });
  }

  private getCategory(): void {
    this.searchService.getCategory(this.form.get('id')?.value).subscribe(res => {
      if (res) {
        Object.entries(res).forEach(([k, v]) => {
          this.form.get(k)?.setValue(v);
        });
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this._snackBar.open('Preencha todos os campos do formulário de criação de categoria!', 'Close', {
        duration: 3000
      });
    } else {
      if (this.form.get('id')?.value)
        this.admService.editCategory(this.form.get('id')?.value, this.form.value).subscribe(res => {
          if (res) {
            this._snackBar.open('Categoria editada com sucesso!', 'Fechar', { duration: 3000 });
            this.router.navigate(['adm', 'categories']);
          }
        });
      else
        this.admService.createCategory(this.form.value).subscribe(res => {
          if (res) {
            this._snackBar.open('Categoria criada com sucesso!', 'Fechar', { duration: 3000 });
            this.router.navigate(['adm', 'categories']);
          }
        });
    }
  }

  public cancel(): void {
    this.router.navigate(['adm', 'categories']);
  }

  ngOnDestroy(): void {
    this._subs.forEach(sub => {
      sub?.unsubscribe();
    });
  }
}