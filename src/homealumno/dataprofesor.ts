export class DataProfesor {

  constructor(
    public _id: string,
    public data: {
      _id: string,
      apellidos: string,
      curso: string,
      edad: Date,
      loc: {lat : number, lng: number }
    },
    public email: string,
    public password: string
  ) {  }

}
