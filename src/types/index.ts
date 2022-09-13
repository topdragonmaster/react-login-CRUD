export interface IPassword {
  upperCase: boolean;
  lowerCase: boolean;
  number: boolean;
  specialChr: boolean;
  length: boolean;
}

export interface IBaseUser {
  name: string;
  email: string;
  gender: string;
  status: string;
}

export interface IUser extends IBaseUser {
  id: number;
}
