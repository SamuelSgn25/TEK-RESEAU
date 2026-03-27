import { AttendanceService } from './attendance.service';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    mark({ activityId, memberId, status }: {
        activityId: number;
        memberId: number;
        status: string;
    }): Promise<{
        id: number;
        updatedAt: Date;
        status: string;
        memberId: number;
        activityId: number;
    }>;
    getForActivity(id: string): Promise<({
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
    remove(activityId: string, memberId: string): Promise<{
        id: number;
        updatedAt: Date;
        status: string;
        memberId: number;
        activityId: number;
    }>;
}
