export interface DetalleVentas {
  num_sec: number;
  nsec_venta: number;
  nsec_producto: number;
  cantidad: number;
  precio: number;
  descuento: number;
  created_at: string;
  updated_at: string;
};

export interface DetalleVentasListado {
  num_sec: number;
  nsec_venta: number;
  nsec_producto: number;
  cantidad: number;
  precio: number;
  descuento: number;
  created_at: string;
  updated_at: string;
  total: number;
};


// public long num_sec { get; set; }
// public long nsec_venta { get; set; }
// public long nsec_prodcuto { get; set; }
// public int cantidad { get; set; }
// public decimal precio { get; set; }
// public decimal descuento { get; set; }
// public string? created_at { get; set; }
// public string? updated_at { get; set; }

//     [JsonIgnore]
//     public int total { get; set; }
