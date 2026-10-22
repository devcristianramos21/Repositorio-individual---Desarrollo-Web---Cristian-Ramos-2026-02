// Ejemplo de productos de NEXO
export const CATEGORIAS = ["Bebidas", "Snacks", "Dulces", "Lácteos", "Panadería", "Frutas y Verduras", "Carnes y Pescados", "Congelados", "Cereales y Granos", "Salsas y Condimentos"];

//export type Producto = (typeof CATEGORIAS)[number];
export type Categoria = (typeof CATEGORIAS)[number];
// mínimo de productos que se pueden comprar de un mismo producto
export const UNIDADES_MINIMAS = 5;

export interface Producto {
    id: string;
    nombre: string;
    descripcion: string;
    categoria: Categoria;
    precio: number;
    unidades: number;
}

export type ProductoDatos = Omit<Producto, "id">;

// comentario: se puede usar para crear un producto nuevo, sin necesidad de pasar el id

