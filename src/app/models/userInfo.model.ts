export class UserInfo {
  constructor(
    public username: string,
    public email: string,
    public password: string,
    public id: string,
    public startToken?: number,
    public expToken?: number
  ) {}
}
