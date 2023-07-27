import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash, compare } from 'bcryptjs';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository : Repository<User>,
    private readonly JwtService : JwtService,
  ) {}

  // ------------------------------------------  METHODES CRUD --------------------------------------------- 

  async create(createUserDto: CreateUserDto) {
    // Encoder le mot de passe
    createUserDto.password = await hash(createUserDto.password, 10);
    // Enregistre le nouveau user dans la DB
    const newUser = await this.usersRepository.save(createUserDto)
    return newUser;
  }
  
  async findAll() {
    const users = await this.usersRepository.find()
    return users;
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id: id });
    if(!user){
      throw new NotFoundException(`Aucun candidat trouvé avec l'id renseigné: ${id}`)
    }
    return user;
  }

  async update(id: number, updateCandidateDto: UpdateUserDto) {
    const user = await this.findOne(id)
    updateCandidateDto.password = await hash(updateCandidateDto.password, 10);
    await this.usersRepository.update(id, updateCandidateDto)
    return user;
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    await this.usersRepository.delete(id)
    return user;
  }

  // -----------------------  ACCESS JWT TOKEN ----------------------------------------------------

  private createAuthenticationToken(userId: number, email: string): string{
    return this.JwtService.sign({ userId, email }, {secret: "secret"}); // ! à définir dans une variable d'env et ne pas afficher en clair !!
  }
  
  async signIn(authCredentialsDTO: AuthCredentialsDTO){
    let user : User;
    const email = authCredentialsDTO.email;
    try {
      user = await this.usersRepository.findOneBy({ email : email });
    } catch (error) {
      throw new NotFoundException(`Aucun utilisateur trouvé avec cet email : ${email} `)
    }
    const passwordMatch = await compare(authCredentialsDTO.password, user.password);
  
    if (!passwordMatch) {
      throw new NotFoundException('Les données fournies sont invalides')    
    }

    const token = this.createAuthenticationToken(user.id, user.email);

    return {token}
  }

}