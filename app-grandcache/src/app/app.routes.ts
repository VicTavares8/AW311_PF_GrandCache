import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Inventario } from './pages/inventario/inventario';
import { Administracion } from './pages/administracion/administracion';

import { Usuarios } from './pages/usuarios/usuarios';
import { Categorias } from './pages/categorias/categorias';
import { Proveedores } from './pages/proveedores/proveedores';
import { ProductoForm } from './pages/producto-form/producto-form';
import { Movimientos } from './pages/movimientos/movimientos';

export const routes: Routes = [
  //Ruta por defecto: Login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'inventario', component: Inventario },

  //Ruta de creación: Administracion
  {
    path: 'administracion',
    component: Administracion,
    children: [
      //Rutas hijas dentro de Administracion
      { path: 'usuarios', component: Usuarios },
      { path: 'categorias', component: Categorias },
      { path: 'proveedores', component: Proveedores },
      { path: 'nuevo-producto', component: ProductoForm },
      { path: 'movimientos', component: Movimientos },
      { path: '', redirectTo: 'movimientos', pathMatch: 'full' } //Por defecto al entrar a administracion
    ]
  }
];
