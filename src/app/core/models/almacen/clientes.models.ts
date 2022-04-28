export interface Clientes {
  num_sec: number;
  nombre: string;
  tipo_documento: string;
  num_documento: string;
  direccion: string;
  telefono: string;
  email: string;
  estado: string;
  created_at: string;
  updated_at: string;
};

export interface ClientesListado {
  num_sec: number;
  nombre: string;
  tipo_documento: string;
  num_documento: string;
  direccion: string;
  telefono: string;
  email: string;
  estado: string;
  created_at: string;
  updated_at: string;
  total: number;
};


