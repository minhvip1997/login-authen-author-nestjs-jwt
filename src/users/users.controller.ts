import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { EditUserDto } from './dto/edit-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { Roles } from './roles.decorator';
import { Role } from './entities/role.enum';
import { RolesGuard } from './roles.guard';

@Controller('users')
export class UsersController {

    constructor(
        private readonly userService: UsersService
    ){

    }

    @Post('register')
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async createUser(
        @Body('username') username:string,
        @Body('password') password:string
    ){
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await this.userService.createOne({
            username,
            password: hashedPassword
        });
      
        delete user.password;
      
        return user;
    }

    @Put('update')
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async updateUser(
        @Param('id') id:number,
        @Body() dto: EditUserDto
    ){
        const data = await this.userService.editOne(id, dto);
        return {message: 'User edited', data};
    }

    @Delete(':id')
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async deleteOne(@Param('id') id:number){
        const data = await this.userService.deleteOne(id);
        return {
            message: 'User delete',
            data
        }
    }
}
