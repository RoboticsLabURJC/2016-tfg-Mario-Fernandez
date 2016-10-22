export class QueryScheme {

  constructor(
    public curso: string,
    public clase: {
      curso: string,
    },
    public loc: {lat : number, lng: number }
  ) {  }

}
