export class CreateUserDto {
  id: string;
  nickName: string;
  email: string;
  password: string;
  photoURL: string;
  phoneNumber: string;
  role: string;
  joinedDate: string;
}

export class FirebaseUserDto {
  uid: string;
  email: string;
  name: string;
  picture: string;
}
