export interface Categrias {
  num_sec: number;
  nombre: string;
  descripcion: string;
  estado: string;
  created_at: string;
  updated_at: string;
};

export interface CategoriasListado {
  num_sec: number;
  nombre: string;
  descripcion: string;
  estado: string;
  created_at: string;
  updated_at: string;
  total: number;
};
