import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, JwtAuthGuard,JwtStrategy,RolesGuard],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
