import { IsString, IsEmail, MinLength, MaxLength, IsOptional } from "class-validator";

export class CreateUserDto {
    @IsOptional()
    @IsString()
    @MaxLength(255)
    username: string;
  
    @IsString()
    @MinLength(8)
    @MaxLength(128)
    password: string;
}
