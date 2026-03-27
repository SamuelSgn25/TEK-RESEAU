import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            name: any;
            role: any;
        };
    }>;
    registerAdmin(data: any): Promise<{
        id: number;
        email: string;
        password: string;
        name: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getProfile(req: any): any;
}
