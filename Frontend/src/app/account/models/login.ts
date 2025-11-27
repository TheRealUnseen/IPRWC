export class Login {
  private readonly email: string = "";
  private password: string = "";

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  protected getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public setPassword(password: string): void {
    this.password = password;
  }
}
