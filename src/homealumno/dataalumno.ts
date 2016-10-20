export class DataAlumno {

  constructor(
    public Nombre: string,
    public Apellidos: string,
    public Edad: Date,
    public Mail: string,
    public loc: {
      lat : number,
      lng: number
    }
  ) {  }

}
