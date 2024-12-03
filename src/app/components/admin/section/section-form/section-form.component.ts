import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { Item } from 'src/app/interfaces/item';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-section-form',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule, MatSelectModule],
  templateUrl: './section-form.component.html',
  styleUrls: ['../../form.css', './section-form.component.css']
})
export class SectionFormComponent implements OnInit{
  private _snackBar = inject(MatSnackBar);

  selectFormControl = new FormControl('', Validators.required);

  private _createSectionForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  public get createSectionForm() {
    return this._createSectionForm;
  }

  items: Item[] = [

  ]

  constructor(private router: Router, private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.getItems().subscribe(res => {
      if (res.status == 200)
        this.items = res.data ?? [];
    });
  }

  onSubmit() {
    if (this.createSectionForm.invalid) {
      this._snackBar.open('Preencha todos os campos do formulário de criação de seção!', 'Close', {
        duration: 3000
      });
    } else {
      this.router.navigate(['']);
    }
  }
}