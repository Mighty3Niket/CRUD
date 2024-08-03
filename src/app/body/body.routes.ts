import { Routes } from "@angular/router";

export const BodyRoute : Routes = [
    // {
    //     path: '',
    //     //loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent)
    // },
    {
        path: 'user',
        loadComponent: () => import('./user/user.component').then(c => c.UserComponent)
    },
    {
        path: 'post',
        loadComponent: () => import('./post/post.component').then(c => c.PostComponent)
    },    
]