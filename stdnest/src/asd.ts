interface data {
  name: string;
  email?: string;
  password: string;
}

class CreateUser implements data {
  name = '정한슬';
  password = '1234';

  private createuser = new ChangeUser(this.name, this.password);

  GetSome() {
    return this.createuser.ChangeSum({
      name: this.name,
      password: this.password,
    });
  }
}

class ChangeUser implements data {
  name: string;
  password: string;

  constructor(name: string, password: string) {
    this.name = name;
    this.password = password;
  }

  ChangeSum(data: data) {
    return data;
  }
}

const nameandpassword = new CreateUser();
console.log(nameandpassword.GetSome());
