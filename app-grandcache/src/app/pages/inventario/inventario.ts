import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from '../../services/api';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventario.html',
  styleUrl: './inventario.scss',
})

export class Inventario implements OnInit {
  private api = inject(Api);

  productos = signal<Producto[]>([]);
  cargando = signal<boolean>(true);

  ngOnInit(): void {
    this.cargarInventario();
  }

  cargarInventario() {
    this.cargando.set(true);
    this.api.get('productos').subscribe({
      next: (data) => {
        this.productos.set(data);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error cargando inventario:', err);
        this.cargando.set(false);
      }
    });
  }
}
