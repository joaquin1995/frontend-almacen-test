export interface Facturas {
  num_sec: number;
  nsec_cliente: number;
  nsec_usuario: number;
  nro_factura: number;
  created_at: string;
  updated_at: string;
};

export interface FacturasListado {
  num_sec: number;
  nsec_cliente: number;
  nsec_usuario: number;
  nro_factura: number;
  created_at: string;
  updated_at: string;
  total: number;
};

