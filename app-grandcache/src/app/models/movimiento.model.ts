export interface Movimiento {
    id?: number;
    id_producto: number;
    tipo: 'IN' | 'OUT';
    cantidad: number;
    fecha_hora?: string;
    id_usuario: number;

    // Opcionales para visualización
    nombre_producto?: string;
    nombre_usuario?: string;
}
