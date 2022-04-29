export interface Ingresos {
  num_sec: number;
  nsec_proveedor: number;
  nsec_ususario: number;
  tipo_comprobante: string;
  serie_comprobante: string;
  num_comprobante: string;
  impuesto: number;
  total_ingresos: number;
  estado: string;
  created_at: string;
  updated_at: string;
};

export interface IngresosListado {
  num_sec: number;
  nsec_proveedor: number;
  proveedro: string;
  nsec_ususario: number;
  usuario: string;
  tipo_comprobante: string;
  serie_comprobante: string;
  num_comprobante: string;
  impuesto: number;
  total_ingresos: number;
  estado: string;
  created_at: string;
  updated_at: string;
  total: number;
};

