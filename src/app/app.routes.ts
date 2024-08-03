import { Routes } from '@angular/router';
//import { LayoutComponent } from './layout/layout/layout.component';
//import { LoginComponent } from './body/login/login.component';
//import { NgxPermissionsGuard } from 'ngx-permissions';
//import { authGuard } from './auth.guard';
import { DashboardComponent } from './body/dashboard/dashboard.component';
import { UserComponent } from './body/user/user.component';
import { PostComponent } from './body/post/post.component';


export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        //loadChildren: () => import('./body/body.routes').then(r => r.BodyRoute),
        //canActivate: [authGuard]
    },
    {
        path: 'user',
        component: UserComponent,
        loadChildren: () => import('./body/body.routes').then(r => r.BodyRoute),
        //canActivate: [authGuard]
    },
    {
        path: 'post',
        component: PostComponent,
        loadChildren: () => import('./body/body.routes').then(r => r.BodyRoute),
        //canActivate: [authGuard]
    },
    // {path:'login',component:LoginComponent},
];
