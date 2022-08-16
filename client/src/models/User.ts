
/**
 * Defines user.
 * */

export class User {

  constructor(
    public readonly name: string,
    public readonly username: string,
    public readonly token: string,
    public readonly widgetEndpoints: [{url:string, token:string}]
  ) {}

}
