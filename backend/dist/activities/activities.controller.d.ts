import { ActivitiesService } from './activities.service';
export declare class ActivitiesController {
    private readonly activitiesService;
    constructor(activitiesService: ActivitiesService);
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
    findOne(id: string): Promise<({
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
    update(id: string, data: any): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        date: Date;
        startTime: string;
        endTime: string;
    }>;
    remove(id: string): Promise<{
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
