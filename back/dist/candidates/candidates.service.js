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
exports.CandidatesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const candidate_entity_1 = require("./entities/candidate.entity");
let CandidatesService = exports.CandidatesService = class CandidatesService {
    constructor(candidatesRepository) {
        this.candidatesRepository = candidatesRepository;
    }
    async create(createCandidateDto) {
        const newCandidate = await this.candidatesRepository.save(createCandidateDto);
        return newCandidate;
    }
    async findAll() {
        const candidates = await this.candidatesRepository.find();
        return candidates;
    }
    async findOne(id) {
        const candidate = await this.candidatesRepository.findOneBy({ id: id });
        if (!candidate) {
            throw new common_1.NotFoundException(`Aucun candidat trouvé avec l'id renseigné: ${id}`);
        }
        return candidate;
    }
    async update(id, updateCandidateDto) {
        const candidate = await this.findOne(id);
        await this.candidatesRepository.update(id, updateCandidateDto);
        return candidate;
    }
    async remove(id) {
        const candidate = await this.findOne(id);
        await this.candidatesRepository.delete(id);
        return candidate;
    }
};
exports.CandidatesService = CandidatesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(candidate_entity_1.Candidate)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CandidatesService);
//# sourceMappingURL=candidates.service.js.map