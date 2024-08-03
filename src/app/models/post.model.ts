export interface Posts{
    result: Post[];
    statusCode: number;
    errorMessage: string;
}
export interface Post{
    id: number;
    title: string;
    description: string;
    category: number;
    createdBy: string;
    createdDate: Date;
    isPublished: boolean;
}
export interface PublishedPosts{
    result: PublishedPost[];
    statusCode: number;
    errorMessage: string;
}
export interface PublishedPost{
    //id: number;
    title: string;
    description: string;
    category: number;
    createdBy: string;
    createdDate: Date;
    //isPublished: boolean;
}
export interface AddPosts{
    result: AddPost[];
    statusCode: number;
    errorMessage: string;
}
export interface AddPost{
    //id: number;
    title: string;
    description: string;
    category: number;
    createdBy: string;
    createdDate: Date;
    isPublished: boolean;
}