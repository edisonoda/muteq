import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { Section } from 'src/app/interfaces/section';
import { MatSelectModule } from '@angular/material/select';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-item-form',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule, MatSelectModule],
  templateUrl: './item-form.component.html',
  styleUrls: ['../../form.css', './item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  @ViewChild('imgInput') imgInput!: ElementRef<HTMLInputElement>;

  private _snackBar = inject(MatSnackBar);

  private _createItemForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    manufacturer: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    section: new FormControl('', [Validators.required]),
  });
  public get createItemForm() {
    return this._createItemForm;
  }

  categories: Category[] = [];
  sections: Section[] = [];

  constructor(private router: Router, private searchService: SearchService) { }

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

  onSubmit() {
    if (this.createItemForm.invalid) {
      this._snackBar.open('Preencha todos os campos do formulário de cadastro!', 'Close', {
        duration: 3000
      });
    } else {
      this.router.navigate(['admin', 'items']);
    }
  }

  // onFileSelected() {
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
}