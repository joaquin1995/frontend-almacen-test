export class Paginado {
  // Numero total de elementos
  totalElementos: number;
  // Numero de pagina actual
  numeroPaginaActual: number;
  // Numero de pagina actual
  cantidadMostrar: number;
}

export class EventPage {
  count?: number;
  limit?: number
  offset: number
  pageSize?: number
}
