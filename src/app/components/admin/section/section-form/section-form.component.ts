import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/interfaces/item';
import { SearchService } from 'src/app/services/search.service';
import { Subscription } from 'rxjs';
import { AdmService } from 'src/app/services/adm.service';
import { FileUploaderComponent } from 'src/app/shared/file-uploader/file-uploader.component';

@Component({
  selector: 'app-section-form',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploaderComponent,
  ],
  templateUrl: './section-form.component.html',
  styleUrls: ['../../form.css']
})
export class SectionFormComponent implements OnInit, OnDestroy {
  private readonly _snackBar = inject(MatSnackBar);

  private _title: string = 'Cadastrar Seção';
  public get title() { return this._title; }
  public set title(t: string) { this._title = t; }

  private _form: FormGroup = this.setupForm();
  public get form() {
    return this._form;
  }

  private _items: Array<Item> = [];
  public get items() { return this._items; }
  public set items(i: Array<Item>) { this._items = i; }

  private _image: string = '';
  public get image() { return this._image; }

  private _subs: Array<Subscription> = [];

  constructor(
    private searchService: SearchService,
    private admService: AdmService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this._subs.push(
      // Verifica se vai editar alguma seção (possui id na url)
      this.route.params.subscribe(params => {
        const id = parseInt(params['id']);

        if (!isNaN(id))
          this._form = this.setupForm(id);
        else
          this._form = this.setupForm();
      }),
    );
  }

  ngOnInit(): void {
    this.searchService.getItems(undefined, undefined, true).subscribe(res => {
      if (res)
        this.items = res.elements;
    });
  }

  private setupForm(id?: number): FormGroup {
    if (id) {
      this.getSection(id);
      this.title = 'Editar Seção';
    } else {
      this.title = 'Cadastrar Seção';
    }

    return new FormGroup({
      id: new FormControl(id ?? null),
      description: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      image: new FormControl(null, [Validators.required]),
      items: new FormControl([])
    });
  }

  private getSection(id: number): void {
    this.searchService.getSection(id).subscribe(res => {
      if (res) {
        Object.entries(res).forEach(([k, v]) => {
          this.form.get(k)?.setValue(v);
        });

        this._image = res.image ?? '';
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this._snackBar.open('Preencha todos os campos do formulário de criação de seção!', 'Close', {
        duration: 3000
      });
    } else {
      if (this.form.get('id')?.value)
        this.admService.editSection(this.form.get('id')?.value, this.form.value).subscribe(res => {
          if (res) {
            this._snackBar.open('Seção editada com sucesso!', 'Fechar', { duration: 3000 });
            this.router.navigate(['adm', 'sections']);
          }
        });
      else
        this.admService.createSection(this.form.value).subscribe(res => {
          if (res) {
            this._snackBar.open('Seção criada com sucesso!', 'Fechar', { duration: 3000 });
            this.router.navigate(['adm', 'sections']);
          }
        });
    }
  }

  public cancel(): void {
    this.router.navigate(['adm', 'sections']);
  }

  ngOnDestroy(): void {
    this._subs.forEach(sub => {
      sub?.unsubscribe();
    });
  }
}