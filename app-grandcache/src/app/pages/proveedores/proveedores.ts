import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Api } from '../../services/api';
import { Proveedor } from '../../models/proveedor.model';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proveedores.html',
  styleUrl: './proveedores.scss',
})

export class Proveedores implements OnInit {
  private api = inject(Api);
  proveedores = signal<Proveedor[]>([]);
  cargando = signal<boolean>(true);

  //modelo del formulario
  model: Proveedor = {
    empresa: '',
    email_contacto: '',
    telefono: ''
  };

  ngOnInit(): void {
    this.cargarProveedores();
  }

  //GET
  cargarProveedores() {
    this.cargando.set(true);
    this.api.get('proveedores').subscribe({
      next: (data) => {
        this.proveedores.set(data);
        this.cargando.set(false);
      },
      error: (err) => this.cargando.set(false)
    });
  }

  //POST
  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.api.post('proveedores', this.model).subscribe({
      next: (res) => {
        alert('Proveedor registrado');
        form.resetForm();
        this.model = { empresa: '', email_contacto: '', telefono: '' };
        this.cargarProveedores();
      },
      error: (err) => alert('Error al guardar proveedor')
    });
  }
}
