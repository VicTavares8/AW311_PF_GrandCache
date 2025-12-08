import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Api } from '../../services/api';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})
export class Usuarios implements OnInit {
  private api = inject(Api);

  usuarios = signal<Usuario[]>([]);
  cargando = signal<boolean>(true);

  //modelo del formulario
  model: Usuario = {
    nombre_usuario: '',
    nombre_completo: '',
    password: '',
    rol: 'empleado' //por defecto
  };

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  //GET
  cargarUsuarios() {
    this.cargando.set(true);
    this.api.get('usuarios').subscribe({
      next: (data) => {
        this.usuarios.set(data);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error cargando usuarios:', err);
        this.cargando.set(false);
      }
    });
  }

  //POST
  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.api.post('usuarios', this.model).subscribe({
      next: (res) => {
        alert('Usuario registrado correctamente');

        //limpiar el formulario
        form.resetForm();
        this.model = { nombre_usuario: '', nombre_completo: '', password: '', rol: 'empleado' };
        this.cargarUsuarios();
      },
      error: (err) => {
        console.error('Error guardando:', err);
        alert('Error al guardar el usuario. Puede que este usuario ya haya sido guardado.');
      }
    });
  }
}
