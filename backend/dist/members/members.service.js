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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MembersService = class MembersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        try {
            return await this.prisma.member.create({ data });
        }
        catch (e) {
            throw new common_1.ConflictException('Membre déjà existant (Email ou Matricule).');
        }
    }
    async findAll() {
        return this.prisma.member.findMany({
            orderBy: { name: 'asc' },
        });
    }
    async findOne(id) {
        return this.prisma.member.findUnique({ where: { id } });
    }
    async update(id, data) {
        return this.prisma.member.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        return this.prisma.member.delete({ where: { id } });
    }
    async bulkImport(members) {
        const results = [];
        for (const member of members) {
            try {
                const created = await this.prisma.member.upsert({
                    where: { email: member.email || undefined },
                    update: { ...member },
                    create: { ...member },
                });
                results.push(created);
            }
            catch (e) {
                console.error(`Erreur import pour ${member.name}:`, e.message);
            }
        }
        return results;
    }
};
exports.MembersService = MembersService;
exports.MembersService = MembersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MembersService);
//# sourceMappingURL=members.service.js.map