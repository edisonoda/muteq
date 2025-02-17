import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { Section } from 'src/app/interfaces/section';
import { SearchService } from 'src/app/services/search.service';
import { Subscription } from 'rxjs';
import { AdmService } from 'src/app/services/adm.service';
import { FileUploaderComponent } from 'src/app/shared/file-uploader/file-uploader.component';

@Component({
  selector: 'app-item-form',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploaderComponent,
  ],
  templateUrl: './item-form.component.html',
  styleUrls: ['../../form.css']
})
export class ItemFormComponent implements OnInit, OnDestroy {
  private _title: string = 'Cadastrar Item';
  public get title() { return this._title; }
  public set title(t: string) { this._title = t; }

  private _form: FormGroup = this.setupForm();
  public get form() {
    return this._form;
  }

  private _categories: Array<Category> = [];
  public get categories() { return this._categories };
  public set categories(c: Array<Category>) { this._categories = c };

  private _sections: Array<Section> = [];
  public get sections() { return this._sections };
  public set sections(s: Array<Section>) { this._sections = s };

  private _image: string = '';
  public get image() { return this._image; }

  private readonly _snackBar: MatSnackBar = inject(MatSnackBar);
  private _subs: Array<Subscription> = [];

  constructor(
    private searchService: SearchService,
    private admService: AdmService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this._subs.push(
      // Verifica se vai editar algum item (possui id na url)
      this.route.params.subscribe(params => {
        const id = parseInt(params['id']);

        if (!isNaN(id))
          this._form = this.setupForm(id);
        else
          this._form = this.setupForm();
      })
    );
  }

  ngOnInit(): void {
    this.searchService.getCategories(undefined, undefined, true).subscribe(res => {
      if (res)
        this.categories = res.elements;
    });

    this.searchService.getSections(undefined, undefined, true).subscribe(res => {
      if (res)
        this.sections = res.elements;
    });
  }

  private setupForm(id?: number): FormGroup {
    if (id) {
      this.getItem(id);
      this.title = 'Editar Item';
    } else {
      this.title = 'Cadastrar Item';
    }

    return new FormGroup({
      id: new FormControl(id ?? null),
      name: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
      manufacturer: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl(null, [Validators.required]),
      category: new FormControl('', [Validators.required]),
      section: new FormControl('', [Validators.required]),
    });
  }

  private getItem(id: number): void {
    this.searchService.getItem(id, true).subscribe(res => {
      if (res) {
        Object.entries(res).forEach(([k, v]) => {
          this.form.get(k)?.setValue(v);
        });

        this.form.get('category')?.setValue(res.category?.id ?? null);
        this.form.get('section')?.setValue(res.section?.id ?? null);

        this._image = res.image ?? '';
      }
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this._snackBar.open('Preencha todos os campos do formulário de cadastro!', 'Close', {
        duration: 3000
      });
    } else {
      if (this.form.get('id')?.value)
        this.admService.editItem(this.form.get('id')?.value, this.form.value).subscribe(res => {
          if (res) {
            this._snackBar.open('Item editado com sucesso!', 'Fechar', { duration: 3000 });
            this.router.navigate(['adm', 'items']);
          }
        });
      else
        this.admService.createItem(this.form.value).subscribe(res => {
          if (res) {
            this._snackBar.open('Item criado com sucesso!', 'Fechar', { duration: 3000 });
            this.router.navigate(['adm', 'items']);
          }
        });
    }
  }

  public cancel(): void {
    this.router.navigate(['adm', 'items']);
  }

  ngOnDestroy(): void {
    this._subs.forEach(sub => {
      sub?.unsubscribe();
    });
  }
}