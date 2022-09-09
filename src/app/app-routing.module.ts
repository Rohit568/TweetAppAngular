import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditComponent } from './edit/edit.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PostComponent } from './post/post.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path: "login" ,component:LoginComponent},
  {path : "register", component: RegisterComponent},
  {path : "home", component:HomeComponent},
  {path : "logout", component:LogoutComponent},
  {path : "header", component : HeaderComponent},
  {path : "post", component:PostComponent},
  {path : "dashboard", component: DashboardComponent},
  {path : "users", component: UsersComponent},  
  {path : "userdashboard/:uname",component: UserdashboardComponent},
  {path : "edit", component:EditComponent},
  {path: "search/:tag", component:SearchComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
