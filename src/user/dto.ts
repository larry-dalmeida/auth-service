export class UserLoginDTO {
  email: string;
  password: string;

  constructor(credentials) {
    this.email = credentials.email;
    this.password = credentials.password;
  }
}

export class UserRegisterDTO {
  name: string;
  email: string;
  password: string;

  constructor(data) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
  }
}
