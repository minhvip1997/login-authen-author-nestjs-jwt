import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { User } from './entities/user.entity';
// import { User } from './entities/user.entity';


// export type User = any;

@Injectable()
export class UsersService {
    // private readonly users = [
    //     {
    //       userId: 1,
    //       username: 'john',
    //       password: 'changeme',
    //     },
    //     {
    //       userId: 2,
    //       username: 'maria',
    //       password: 'guess',
    //     },
    //   ];
      constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
      ) {}
    
      findAll(): Promise<User[]> {
        return this.usersRepository.find();
      }
      async getOne(id :number){
        const user = await this.usersRepository.findOne(id);
        if(!user) throw new NotFoundException(' user dont exist')
        return user;
    }
      async findOne(username: string): Promise<User| undefined> {
        return this.usersRepository.findOne({ username });
      }
    
      async deleteOne(id: number){
        const user = await this.getOne(id);
        return await this.usersRepository.remove(user);
    }

      // async findOne(username: string): Promise<User | undefined> {
      //   return this.users.find(user => user.username === username);
      // }

      async createOne(dto: CreateUserDto){
        const userExist = await this.usersRepository.findOne({ username: dto.username})

        if(userExist) throw new NotFoundException(' user register exist username')

        const newUser = this.usersRepository.create(dto);

        const user =  await this.usersRepository.save(newUser);

        delete user.password;
        return user;
    }

    async editOne(id: number, dto: EditUserDto){
      const user = await this.getOne(id)
      const editUser = Object.assign(user, dto);

       return await this.usersRepository.save(editUser);
  }
}
