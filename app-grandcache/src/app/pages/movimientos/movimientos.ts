import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Api } from '../../services/api';
import { Movimiento } from '../../models/movimiento.model';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-movimientos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movimientos.html',
  styleUrl: './movimientos.scss',
})
export class Movimientos implements OnInit {
  private api = inject(Api);

  movimientos = signal<Movimiento[]>([]);
  productos = signal<Producto[]>([]);
  cargando = signal<boolean>(true);

  //modelo del formulario
  model: Movimiento = {
    id_producto: 0,
    tipo: 'IN', // 'IN' por defecto para agilizar entradas
    cantidad: 1,
    id_usuario: 1 // IMPORTANTE: Temporalmente fijo en 1 (Vic Admin)
  };

  ngOnInit(): void {
    this.cargarDatos();
  }

  //GET
  cargarDatos() {
    this.cargando.set(true);

    //carga de productos
    this.api.get('productos').subscribe(data => {
      this.productos.set(data);
    });

    //carga de historial de movimientos
    this.api.get('movimientos').subscribe({
      next: (data) => {
        this.movimientos.set(data);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error(err);
        this.cargando.set(false);
      }
    });
  }

  //POST
  onSubmit(form: NgForm) {
    if (form.invalid) return;

    //evitar un prodcuto vacío
    if (this.model.id_producto == 0) {
      alert("Por favor selecciona un producto válido");
      return;
    }

    this.api.post('movimientos', this.model).subscribe({
      next: (res) => {
        alert('Movimiento registrado y Stock actualizado exitosamente');

        //se reinicia la cantidad a 1 pero se mantiene el tipo (in, out). Por si el usuario quiere registrar varios seguidos.
        const tipoAnterior = this.model.tipo;
        form.resetForm();
        this.model = { id_producto: 0, tipo: tipoAnterior, cantidad: 1, id_usuario: 1 };

        this.cargarDatos();
      },
      error: (err) => {
        console.error(err);
        alert('Error al registrar movimiento. Verifica la conexión.');
      }
    });
  }
}
