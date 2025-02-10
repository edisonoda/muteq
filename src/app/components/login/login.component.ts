import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private readonly _snackBar = inject(MatSnackBar);

  private _loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  public get loginForm() {
    return this._loginForm;
  }

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    if (this.loginForm.invalid) {
      this._snackBar.open('Email ou senha incorretos!', 'Fechar', {
        duration: 3000
      });
    } else {
      this.authService.login(this._loginForm.get('email')?.value, this._loginForm.get('password')?.value).subscribe(res => {
        if (res.status == 200) {
          if (res.body?.token) {
            this._snackBar.open('Login realizado com sucesso', 'Fechar', {
              duration: 3000
            });
            localStorage.setItem('muteq-token', res.body?.token);
            this.authService.changeAuth();
            
            this.router.navigate(['']);
          }
        } else if(res.status == 403) {
          this._snackBar.open('Email ou senha incorretos!', 'Fechar', {
            duration: 3000
          });
        } else {
          this._snackBar.open('Ocorreu um erro ao realizar o login', 'Fechar', {
            duration: 3000
          });
        }
      }, error => {
        this._snackBar.open('Ocorreu um erro ao realizar o login', 'Fechar', {
          duration: 3000
        });
      });
    }
  }
}
