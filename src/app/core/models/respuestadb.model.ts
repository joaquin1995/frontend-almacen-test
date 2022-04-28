
export interface RespuestaDB<T> {
  status: string;
  response: T;
}

export interface RespuestaListadoDB<T> {
  status: string;
  response: T[];
  total: number;
}
export interface RespuestaError {
  type:    string;
  title:   string;
  status:  string | number;
  traceId: string;
  errors:  any;
  message: string;
}


// export interface RespuestaDB {
//   status: string;
//   response: string;
//   numsec: string;
// }


