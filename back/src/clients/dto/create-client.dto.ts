import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateClientDto {
    @IsNotEmpty()
    @IsString()
    enterprise: string;

    @IsNotEmpty()
    @IsString()
    firstname: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    phone: string;

}