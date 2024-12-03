import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { Section } from 'src/app/interfaces/section';
import { MatSelectModule } from '@angular/material/select';
import { SearchService } from 'src/app/services/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-form',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule, MatSelectModule],
  templateUrl: './item-form.component.html',
  styleUrls: ['../../form.css', './item-form.component.css']
})
export class ItemFormComponent implements OnInit, OnDestroy {
  // @ViewChild('imgInput') imgInput!: ElementRef<HTMLInputElement>;

  private _title: string = 'Cadastrar Item';
  public get title() { return this._title; }
  public set title(t: string) { this._title = t; }

  private _form: FormGroup = this.blankForm();
  public get form() {
    return this._form;
  }

  private _categories: Array<Category> = [];
  public get categories() { return this._categories };
  public set categories(c: Array<Category>) { this._categories = c };

  private _sections: Array<Section> = [];
  public get sections() { return this._sections };
  public set sections(s: Array<Section>) { this._sections = s };

  private readonly _snackBar: MatSnackBar = inject(MatSnackBar);
  private _subs: Array<Subscription> = [];

  constructor(private route: ActivatedRoute, private router: Router, private searchService: SearchService) {
    this._subs.push(
      // Verifica se vai editar algum item (possui id na url)
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
          this.getItem();
      })
    );
  }

  ngOnInit(): void {
    this.searchService.getCategories().subscribe(res => {
      if (res.status == 200)
        this.categories = res.data ?? [];
    });

    this.searchService.getSections().subscribe(res => {
      if (res.status == 200)
        this.sections = res.data ?? [];
    });
  }

  private blankForm(id?: number): FormGroup {
    this.title = id ? 'Editar Item' : 'Cadastrar Item';

    return new FormGroup({
      id: new FormControl(id ?? null),
      name: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
      manufacturer: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      img: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      section: new FormControl('', [Validators.required]),
    });
  }

  private getItem(): void {
    this.searchService.getItem(this.form.get('id')?.value).subscribe(res => {
      if (res.status == 200 && res.data) {
        Object.entries(res.data).forEach(([k, v]) => {
          this.form.get(k)?.setValue(v);
        });

        this.form.get('category')?.setValue(res.data.category?.id ?? null);
        this.form.get('section')?.setValue(res.data.section?.id ?? null);
      }
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this._snackBar.open('Preencha todos os campos do formulário de cadastro!', 'Close', {
        duration: 3000
      });
    } else {
      this.router.navigate(['adm', 'items']);
    }
  }

  // public onFileSelected(): void {
  //   if (typeof (FileReader) !== 'undefined') {
  //     const reader = new FileReader();

  //     reader.onload = (e: ProgressEvent<FileReader>) => {
  //       console.log(e.target?.result);
  //       this._createItemForm.get('img')?.setValue(e.target?.result);
  //     };

  //     if (this.imgInput.nativeElement.files?.length) {
  //       const file = this.imgInput.nativeElement.files.item(0);

  //       if (file)
  //         reader.readAsArrayBuffer(file);
  //     }
  //   }
  // }

  ngOnDestroy(): void {
    this._subs.forEach(sub => {
      sub?.unsubscribe();
    });
  }
}