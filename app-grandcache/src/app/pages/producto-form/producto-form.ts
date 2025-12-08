import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Api } from '../../services/api';
import { Producto } from '../../models/producto.model';
import { Categoria } from '../../models/categoria.model';
import { Proveedor } from '../../models/proveedor.model';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './producto-form.html',
  styleUrl: './producto-form.scss',
})
export class ProductoForm implements OnInit {
  private api = inject(Api);

  categorias = signal<Categoria[]>([]);
  proveedores = signal<Proveedor[]>([]);

  //modelo del formulario
  model: Producto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    stock_min: 5,
    categoria_id: 0, // Se llenará con el select
    proveedor_id: 0  // Se llenará con el select
  };

  ngOnInit(): void {
    this.cargarCatalogos();
  }

  //GET
  cargarCatalogos() {
    this.api.get('categorias').subscribe((data) => {
      this.categorias.set(data);
    });

    this.api.get('proveedores').subscribe((data) => {
      this.proveedores.set(data);
    });
  }

  //POST
  onSubmit(form: NgForm) {
    if (form.invalid) return;

    //validación de un id existente
    if (this.model.categoria_id == 0 || this.model.proveedor_id == 0) {
      alert('Por favor selecciona una Categoría y un Proveedor');
      return;
    }

    this.api.post('productos', this.model).subscribe({
      next: (res) => {
        alert('Producto registrado exitosamente');
        form.resetForm();
        //resetear valores numéricos
        this.model = {
          nombre: '', descripcion: '', precio: 0,
          stock: 0, stock_min: 5,
          categoria_id: 0, proveedor_id: 0
        };
      },
      error: (err) => {
        console.error(err);
        alert('Error al guardar producto');
      }
    });
  }
}
