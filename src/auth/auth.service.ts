import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(email);

    if (
      await bcrypt.compare(
        user?.password,
        await bcrypt.hash(pass, saltOrRounds),
      )
    ) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
