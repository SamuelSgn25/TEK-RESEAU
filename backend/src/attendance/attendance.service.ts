import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async markAttendance(activityId: number, memberId: number, status: string) {
    return this.prisma.attendance.upsert({
      where: {
        memberId_activityId: {
          memberId,
          activityId,
        },
      },
      update: { status },
      create: {
        memberId,
        activityId,
        status,
      },
    });
  }

  async getForActivity(activityId: number) {
    return this.prisma.attendance.findMany({
      where: { activityId },
      include: { member: true },
    });
  }

  async removeMemberFromActivity(activityId: number, memberId: number) {
    return this.prisma.attendance.delete({
      where: {
        memberId_activityId: {
          memberId,
          activityId,
        },
      },
    });
  }
}
