import { PrismaService } from '../prisma/prisma.service';
export declare class AttendanceService {
    private prisma;
    constructor(prisma: PrismaService);
    markAttendance(activityId: number, memberId: number, status: string): Promise<{
        id: number;
        updatedAt: Date;
        status: string;
        memberId: number;
        activityId: number;
    }>;
    getForActivity(activityId: number): Promise<({
        member: {
            id: number;
            email: string | null;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            registrationNumber: string | null;
            status: string;
        };
    } & {
        id: number;
        updatedAt: Date;
        status: string;
        memberId: number;
        activityId: number;
    })[]>;
    removeMemberFromActivity(activityId: number, memberId: number): Promise<{
        id: number;
        updatedAt: Date;
        status: string;
        memberId: number;
        activityId: number;
    }>;
}
