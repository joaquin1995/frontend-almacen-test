export interface Productos {
  num_sec: number;
  nsec_categoria: number;
  nsec_marca: number;
  codigo: string;
  ruta: string;
  nombre: string;
  precio_venta: number;
  descripcion: string;
  estado: string;
  created_at: string;
  updated_at: string;
};

export interface ProductosListado {
  num_sec: number;
  nsec_categoria: number;
  nsec_marca: number;
  codigo: string;
  ruta: string;
  nombre: string;
  precio_venta: number;
  descripcion: string;
  estado: string;
  created_at: string;
  updated_at: string;
  total: number;
};
