import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Api } from '../../services/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private router = inject(Router);
  private api = inject(Api);

  isLoginMode = true;

  model = {
    nombre_usuario: '',  //coincide con BD
    nombre_completo: '', //coincide con BD
    password: ''
  };

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    if (this.isLoginMode) {
      // LOGIN
      this.api.post('auth/login', this.model).subscribe({
        next: (res: any) => {
          localStorage.setItem('usuario', JSON.stringify(res.usuario));
          this.router.navigate(['/dashboard']);
        },
        error: (err) => alert('Usuario o contraseña incorrectos')
      });
    } else {
      // REGISTRO
      this.api.post('auth/register', this.model).subscribe({
        next: (res) => {
          alert('Usuario creado con éxito. Por favor inicia sesión.');
          this.toggleMode(); // Cambiamos a pantalla de login
        },
        error: (err) => alert('Error: Puede que ese nombre de usuario ya exista.')
      });
    }
  }
}
