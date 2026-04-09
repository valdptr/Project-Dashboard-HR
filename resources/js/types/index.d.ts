export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    role: 'admin' | 'viewer';
}

export interface MasterPoh {
    id: number;
    region_name: string;
}

export interface MasterLevel {
    id: number;
    level_name: string;
    sort_order: number;
}

export interface Employee {
    id: number;
    employee_id_number: string;
    full_name: string;
    gender: 'Male' | 'Female';
    employment_status: 'PKWT' | 'PKWTT';
    poh_id: number;
    level_id: number;
    join_date: string;
    resign_date: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    poh?: MasterPoh;
    level?: MasterLevel;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
