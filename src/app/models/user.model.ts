export interface Users{
    result: User[];
    statusCode: number;
    message: string;
}
export interface User{
    id: number;
    name: string;
    password: string;
    isActive: boolean;
}
export interface GetUsers{
    result: GetUser[];
    statusCode: number;
    message: string;
}
export interface GetUser{
    id: number;
    name: string;
    password: string;
    isActive: boolean;
}
export interface AddUsers{
    result: AddUser[];
    statusCode: number;
    message: string;
}
export interface AddUser{
    //id: number;
    name: string;
    //password: string;
    isActive: boolean;
}