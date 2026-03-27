import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CustomerQuery {
    id: bigint;
    status: string;
    serviceType: string;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
    phone: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addQuery(name: string, phone: string, email: string, serviceType: string, message: string): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllQueries(): Promise<Array<CustomerQuery>>;
    getCallerUserRole(): Promise<UserRole>;
    getQueryCountByStatus(): Promise<Array<[string, bigint]>>;
    isCallerAdmin(): Promise<boolean>;
    updateQueryStatus(queryId: bigint, newStatus: string): Promise<void>;
}
