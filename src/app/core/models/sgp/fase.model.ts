export interface Fase {
  num_sec: number;
  nsec_proyecto: number;
  nsec_tipo_fase: number;
  descripcion: string;
  ponderacion: number;
  ejecuta?: number;
  ejecutado?: number;
  anual_ponderacion?: number;
  anual_ejecuta?: number;
  anual_ejecutado?: number;
  programacion_egreso?: null;
  programacion_gasto?: number;
  ejecucion_egreso?: any;
  ejecucion_gasto?: any;
  nsec_estado_sgp: number;
  estado?: any;
  nsec_usuario_registro: number;
}

export interface FaseDto {
  num_sec: number;
  nsec_proyecto: number;
  nsec_tipo_fase: number;
  descripcion: string;
  ponderacion: number;
  ejecuta: number;
  ejecutado: number;
  anual_ponderacion: number;
  anual_ejecuta: number;
  anual_ejecutado: number;
  programacion_egreso: number;
  programacion_gasto: number;
  ejecucion_egreso: number;
  ejecucion_gasto: number;
  nsec_estado_sgp: number;
  total: number;
}
