import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    try {
      return await this.prisma.member.create({ data });
    } catch (e) {
      throw new ConflictException('Membre déjà existant (Email ou Matricule).');
    }
  }

  async findAll() {
    return this.prisma.member.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.member.findUnique({ where: { id } });
  }

  async update(id: number, data: any) {
    return this.prisma.member.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.member.delete({ where: { id } });
  }

  async bulkImport(members: any[]) {
    const results = [];
    for (const member of members) {
      try {
        const created = await this.prisma.member.upsert({
          where: { email: member.email || undefined },
          update: { ...member },
          create: { ...member },
        });
        results.push(created);
      } catch (e) {
        // Log errors but continue
        console.error(`Erreur import pour ${member.name}:`, e.message);
      }
    }
    return results;
  }
}
