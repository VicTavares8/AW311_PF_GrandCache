export interface Producto {
    id?: number;
    nombre: string;
    descripcion?: string;
    precio: number;
    stock: number;
    stock_min: number;
    imagen_url?: string;
    categoria_id: number;
    proveedor_id: number;

    nombre_categoria?: string;
    nombre_proveedor?: string;
}
