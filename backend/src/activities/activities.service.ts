import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActivitiesService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.activity.create({
      data: {
        ...data,
        date: new Date(data.date),
      },
    });
  }

  async findAll() {
    return this.prisma.activity.findMany({
      include: {
        _count: {
          select: { attendances: { where: { status: 'PRESENT' } } },
        },
      },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.activity.findUnique({
      where: { id },
      include: {
        attendances: {
          include: { member: true },
        },
      },
    });
  }

  async update(id: number, data: any) {
    return this.prisma.activity.update({
      where: { id },
      data: {
        ...data,
        date: data.date ? new Date(data.date) : undefined,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.activity.delete({ where: { id } });
  }
}
