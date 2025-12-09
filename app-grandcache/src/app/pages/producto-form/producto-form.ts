import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Api } from '../../services/api';
import { ActivatedRoute, Router } from '@angular/router';
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
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  categorias = signal<Categoria[]>([]);
  proveedores = signal<Proveedor[]>([]);

  //para controlar si es POST o PATCH
  idProducto: number | null = null;

  //modelo del formulario
  model: Producto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    stock_min: 5,
    categoria_id: 0,
    proveedor_id: 0
  };

  ngOnInit(): void {
    this.cargarCatalogos();

    //leer si se va a actualizar
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      if (id) {
        console.log("ID detectado:", id);
        this.idProducto = +id;
        this.cargarProducto(this.idProducto);
      }
    });
  }

  //carga de datos de un producto existente
  cargarProducto(id: number) {
    this.api.get(`productos/${id}`).subscribe({
      next: (data: any) => {
        console.log("Datos recibidos de la API:", data);

        if (Array.isArray(data) && data.length > 0) {
            this.model = data[0];
        } else {
            this.model = data;
        }
      },
      error: (err) => console.error('Error al cargar producto', err)
    });
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

  //POST y PATCH
  onSubmit(form: NgForm) {
    if (form.invalid) return;

    //validación de un id existente
    if (this.model.categoria_id == 0 || this.model.proveedor_id == 0) {
      alert('Por favor selecciona una Categoría y un Proveedor');
      return;
    }

    //se decide si es UPDATE O CREATE
    if (this.idProducto) {
      // === MODO EDICIÓN (PUT) ===
      this.api.put(`productos/${this.idProducto}`, this.model).subscribe({
        next: (res) => {
          alert('Producto actualizado exitosamente');
          //no se resetea el formulario
          this.router.navigate(['/inventario']);
        },
        error: (err) => {
          console.error(err);
          alert('Error al actualizar producto');
        }
      });

    } else {
      //POST
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
}
