import { PrismaService } from '../prisma/prisma.service';
export declare class MembersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        id: number;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        registrationNumber: string | null;
        status: string;
    }>;
    findAll(): Promise<{
        id: number;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        registrationNumber: string | null;
        status: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        registrationNumber: string | null;
        status: string;
    } | null>;
    update(id: number, data: any): Promise<{
        id: number;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        registrationNumber: string | null;
        status: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        registrationNumber: string | null;
        status: string;
    }>;
    bulkImport(members: any[]): Promise<any[]>;
}
