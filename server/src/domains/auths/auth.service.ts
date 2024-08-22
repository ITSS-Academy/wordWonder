import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    try {
      const user = await this.usersService.checkUser(email, pass);
      const payload = {
        id: user.id,
        nickName: user.nickName,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        joinedDate: user.joinedDate,
      };
      // TODO: Generate a JWT and return it here
      // instead of the user object
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (e) {
      throw new HttpException(e, HttpStatus.UNAUTHORIZED);
    }
  }
}
