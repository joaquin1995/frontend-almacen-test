export interface Ventas {
  num_sec: number;
  nsec_cliente: number;
  nsec_usuario: number;
  tipo_comprobante: string;
  serie_comprobante: string;
  num_comprobante: string;
  impuesto: number;
  total_venta: number;
  estado: string;
  created_at: string;
  updated_at: string;
};

export interface VentasListado {
  num_sec: number;
  nsec_cliente: number;
  nsec_usuario: number;
  tipo_comprobante: string;
  serie_comprobante: string;
  num_comprobante: string;
  impuesto: number;
  total_venta: number;
  estado: string;
  created_at: string;
  updated_at: string;
  total: number;
};

