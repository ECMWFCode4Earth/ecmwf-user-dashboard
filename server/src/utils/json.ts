export class Payload {

  constructor(
    private _status: number = 404,
    private _message: string = "Not found",
    private _json: any = {}
  ) {}

  public setStatus(status: number) {
    this._status = status;
    return this;
  }

  public setMessage(message: string) {
    this._message = message;
    return this;
  }

  public setJson(json: any) {
    this._json = json;
    return this;
  }


  public error(json: any = {}, message: string = "An unexpected error occurred") {
    this._status = 500;
    this._message = message;
    this._json = json;
    return this;
  }

  public success(json: any, message: string = "Success") {
    this._status = 200;
    this._message = message;
    this._json = json;
    return this;
  }

  get status() {
    return this._status;
  }

  get json() {
    return this._json;
  }


}
