export class ProfesorScheme {

  constructor(
    public nombre: string,
    public apellidos: string,
    public password: string,
    public edad: Date,
    public email: string,
    public curso: string,
    public loc: {lat : number, lng: number }
  ) {  }

}
