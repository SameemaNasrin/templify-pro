export class User {
  constructor(
    public email: string = '',
    public id: string = '',
    private _token: string = '',
    private _expiresIn: Date = new Date(0)
  ) {}

  get token() {
    if (!this._expiresIn || this._expiresIn < new Date()) return null;
    return this._token;
  }

  get expiresIn() {
    return this._expiresIn;
  }
}
