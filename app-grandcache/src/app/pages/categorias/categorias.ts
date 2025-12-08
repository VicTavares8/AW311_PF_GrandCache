import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Api } from '../../services/api';
import { Categoria } from '../../models/categoria.model';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categorias.html',
  styleUrl: './categorias.scss',
})
export class Categorias implements OnInit{
  private api = inject(Api);

  categorias = signal<Categoria[]>([]);
  cargando = signal<boolean>(true);

  //modelo del formulario
  model: Categoria = {
    nombre: '',
    descripcion: ''
  };

  ngOnInit(): void {
    this.cargarCategorias();
  }

  //GET
  cargarCategorias() {
    this.cargando.set(true);
    this.api.get('categorias').subscribe({
      next: (data) => {
        this.categorias.set(data);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error:', err);
        this.cargando.set(false);
      }
    });
  }

  //POST
  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.api.post('categorias', this.model).subscribe({
      next: (res) => {
        alert('Categoría creada con éxito');
        //limpiar el formulario
        form.resetForm();
        this.model = { nombre: '', descripcion: '' };
        this.cargarCategorias();
      },
      error: (err) => {
        alert('Error al guardar categoría');
      }
    });
  }
}
