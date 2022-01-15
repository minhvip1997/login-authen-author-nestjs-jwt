import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
      private usersService: UsersService,
      private jwtService: JwtService
      ) {

    }

    async validateUser(username: string, password: string): Promise<User> {
      console.log(username, password)
        const user = await this.usersService.findOne(username);
        if(!await bcrypt.compare(password, user.password)){
          throw new BadRequestException('invalid credentials');
        }
        // if (user && user.password === password) {
        //   const { password, ...result } = user;
        //   return { password, ...result };
        // }
        return user;
      }

      async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
          // user
        };
      }
}
