"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcryptjs_1 = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
let UsersService = exports.UsersService = class UsersService {
    constructor(usersRepository, JwtService) {
        this.usersRepository = usersRepository;
        this.JwtService = JwtService;
    }
    async create(createUserDto) {
        createUserDto.password = await (0, bcryptjs_1.hash)(createUserDto.password, 10);
        const newUser = await this.usersRepository.save(createUserDto);
        return newUser;
    }
    async findAll() {
        const users = await this.usersRepository.find();
        return users;
    }
    async findOne(id) {
        const user = await this.usersRepository.findOneBy({ id: id });
        if (!user) {
            throw new common_1.NotFoundException(`Aucun utilisateur trouvé avec l'id renseigné: ${id}`);
        }
        return user;
    }
    async update(id, updateUserDto) {
        const user = await this.findOne(id);
        if (updateUserDto.password && updateUserDto.password !== user.password) {
            updateUserDto.password = await (0, bcryptjs_1.hash)(updateUserDto.password, 10);
        }
        else {
            updateUserDto.password = user.password;
        }
        await this.usersRepository.update(id, updateUserDto);
        return user;
    }
    async remove(id) {
        const user = await this.findOne(id);
        await this.usersRepository.delete(id);
        return user;
    }
    createAuthenticationToken(userId, email) {
        return this.JwtService.sign({ userId, email }, { secret: "secret" });
    }
    async signIn(authCredentialsDTO) {
        let user;
        const email = authCredentialsDTO.email;
        try {
            user = await this.usersRepository.findOneBy({ email: email });
        }
        catch (error) {
            throw new common_1.NotFoundException(`Aucun utilisateur trouvé avec cet email : ${email} `);
        }
        const passwordMatch = await (0, bcryptjs_1.compare)(authCredentialsDTO.password, user.password);
        if (!passwordMatch) {
            throw new common_1.NotFoundException('Les données fournies sont invalides');
        }
        const token = this.createAuthenticationToken(user.id, user.email);
        return { token };
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map