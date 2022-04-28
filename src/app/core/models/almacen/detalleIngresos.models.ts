export interface DetalleIngresos {
  num_sec: number;
  nsec_ingreso: number;
  nsec_producto: number;
  cantidad: number;
  precio: number;
  created_at: string;
  updated_at: string;
};

export interface DetalleIngresosListado {
  num_sec: number;
  nsec_ingreso: number;
  nsec_producto: number;
  cantidad: number;
  precio: number;
  created_at: string;
  updated_at: string;
  total: number;
};




// public long num_sec { get; set; }
// public long nsec_ingreso { get; set; }
// public long nsec_producto { get; set; }
// public int cantidad { get; set; }
// public decimal precio { get; set; }
// public string? created_at { get; set; }
// public string? updated_at { get; set; }

//     [JsonIgnore]
//     public int total { get; set; }
