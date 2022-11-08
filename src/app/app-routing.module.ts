import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { AdminComponent } from './_OLD/pages/admin/admin.component';
// import { HomeComponent } from './_OLD/pages/home/home.component';
import { HomeIndexComponent } from './home/page/home-index.component';
import { LoginIndexComponent } from './login/page/login-index.component';
// import { LoginIndexComponent } from './login/page/login-index.component';
import { RoomsIdComponent } from './rooms/page/rooms-id.component';
import { RoomsIndexComponent } from './rooms/page/rooms-index.component';
import { AccessGuard } from './shared/services/access.guard';
import { UsersIndexComponent } from './users/page/users-index.component';
// import { ProfileComponent } from './_OLD/pages/profile/profile.component';
// import { AuthGuard } from './core/services/auth.guard';


const routes: Routes = [
    { path: '', component: HomeIndexComponent },
    { path: 'login', component: LoginIndexComponent },
    { path: 'users', component: UsersIndexComponent, pathMatch: 'full', data:{"requiresLogin": true}, canActivate: [AccessGuard]},
    { path: 'rooms', component: RoomsIndexComponent, pathMatch: 'full', data:{"requiresLogin": true}, canActivate: [AccessGuard]},
    { path: 'rooms/:roomId', component: RoomsIdComponent, pathMatch: 'full', data:{"requiresLogin": true, "serverConfirmRoom": true}, canActivate: [AccessGuard]},
    // { path: 'login', component: LoginIndexComponent},
    // { path: 'login', redirectTo: ''},
    // { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
    {
        path: '**', redirectTo: '', pathMatch: 'full',
    }
    // { path: 'products/:productId', component: ProductDetailsComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
