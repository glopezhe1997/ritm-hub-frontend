export class CreateUserDto {
  name: string;
  Birthdate: Date;
  email: string;
  password: string;
  username: string;

  constructor(
    name: string,
    Birthdate: Date,
    email: string,
    password: string,
    username: string
  ) {
    this.name = name;
    this.Birthdate = Birthdate;
    this.email = email;
    this.password = password;
    this.username = username;
  }
}
