import { PrismaService } from '../prisma/prisma.service';
export declare class ActivitiesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        date: Date;
        startTime: string;
        endTime: string;
    }>;
    findAll(): Promise<({
        _count: {
            attendances: number;
        };
    } & {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        date: Date;
        startTime: string;
        endTime: string;
    })[]>;
    findOne(id: number): Promise<({
        attendances: ({
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
        })[];
    } & {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        date: Date;
        startTime: string;
        endTime: string;
    }) | null>;
    update(id: number, data: any): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        date: Date;
        startTime: string;
        endTime: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        date: Date;
        startTime: string;
        endTime: string;
    }>;
}
