export class Auth {
  constructor(
    /** user identifier */
    public id: string,
    /** identify if a user is logged in or not */
    public anonymous = true
    ) { }
}
