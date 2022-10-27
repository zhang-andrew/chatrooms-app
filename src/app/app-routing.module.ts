import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { AdminComponent } from './_OLD/pages/admin/admin.component';
// import { HomeComponent } from './_OLD/pages/home/home.component';
import { HomeIndexComponent } from './home/page/home-index.component';
import { RoomsIndexComponent } from './rooms/page/rooms-index.component';
import { AccessGuard } from './shared/services/access.guard';
import { UsersIndexComponent } from './users/page/users-index.component';
// import { ProfileComponent } from './_OLD/pages/profile/profile.component';
// import { AuthGuard } from './core/services/auth.guard';


const routes: Routes = [
    { path: '', component: HomeIndexComponent },
    { path: 'users', component: UsersIndexComponent, data:{"requiresLogin": true}, canActivate: [AccessGuard]},
    { path: 'rooms', component: RoomsIndexComponent},
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
