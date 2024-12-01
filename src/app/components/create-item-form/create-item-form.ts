import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { Section } from 'src/app/interfaces/section';
import {MatSelectModule} from '@angular/material/select';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'create-item-form',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule, MatSelectModule],
  templateUrl: 'create-item-form.html',
  styleUrls: ['create-item-form.css']
})
export class CreateItemComponent implements OnInit{
  private _snackBar = inject(MatSnackBar);

  selectFormControl = new FormControl('', Validators.required);

  private _createItemForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    manufacturer: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    photo: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    section: new FormControl('', [Validators.required]),
  });
  public get createItemForm() {
    return this._createItemForm;
  }

  categories: Category[] = [
    
  ];

  sections : Section[] = [
    
  ]

  constructor(private router: Router, private searchService: SearchService) { 
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

  onSubmit() {
    if (this.createItemForm.invalid) {
      this._snackBar.open('Preencha todos os campos do formulário de cadastro!', 'Close', {
        duration: 3000
      });
    } else {
      this.router.navigate(['']);
    }
  }
  
}