export interface Usuario {
    id?: number;
    nombre_usuario: string;
    password?: string;
    nombre_completo: string;
    rol: 'admin' | 'empleado';
}
