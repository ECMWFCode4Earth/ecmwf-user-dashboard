export class CustomResponse {

  constructor(
    private _status: number = 404,
    private _message: string = "Not found",
    private _payload: any = {}
  ) {}

  public setStatus(status: number) {
    this._status = status;
    return this;
  }

  public setMessage(message: string) {
    this._message = message;
    return this;
  }

  public setPayload(payload: any) {
    this._payload = payload;
    return this;
  }


  public error(payload: any = {}, message: string = "An unexpected error occurred") {
    this._status = 500;
    this._message = message;
    this._payload = payload;
    return this;
  }

  public success(payload: any, message: string = "Success") {
    this._status = 200;
    this._message = message;
    this._payload = payload;
    return this;
  }

  get status() {
    return this._status;
  }

  get json() {
    return {
      success: this._status === 200,
      message: this._message,
      data: this._payload,
    };
  }

}
