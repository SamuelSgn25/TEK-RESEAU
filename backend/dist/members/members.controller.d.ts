import { MembersService } from './members.service';
export declare class MembersController {
    private readonly membersService;
    constructor(membersService: MembersService);
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
    findOne(id: string): Promise<{
        id: number;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        registrationNumber: string | null;
        status: string;
    } | null>;
    update(id: string, data: any): Promise<{
        id: number;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        registrationNumber: string | null;
        status: string;
    }>;
    remove(id: string): Promise<{
        id: number;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        registrationNumber: string | null;
        status: string;
    }>;
    bulkImport({ members }: {
        members: any[];
    }): Promise<any[]>;
}
