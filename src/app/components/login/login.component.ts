import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule, FormsModule, Validators} from '@angular/forms';
import {FormGroup, FormControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private _snackBar = inject(MatSnackBar);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', [Validators.required]),
    });

  onSubmit() {
    if (this.loginForm.invalid){
      this._snackBar.open('Email ou senha incorretos!', 'Close', {
        duration: 3000
      })
    }

  }
}
