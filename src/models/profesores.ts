export class ProfesorScheme {

  constructor(
    public Nombre: string,
    public Apellidos: string,
    public Edad: Date,
    public Loc: {lat : number, lng: number },
    public Curso: string,
    public Clase: {
      curso: string,
    }
  ) {  }

}
