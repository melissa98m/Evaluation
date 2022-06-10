import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AdminComponent } from './admin/admin.component';
import { MonumentComponent } from './monument/monument.component';
import { SigninComponent } from './components/signin/signin.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { AuthGuard } from './guard/auth-guard';
import { UserComponent } from './user/user.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import {FourOhFourComponent} from "./components/four-oh-four/four-oh-four.component";
import { AllRestaurantComponent } from './all-restaurant/all-restaurants.component';
import { AllMonumentsComponent } from './all-monuments/all-monuments.component';
import { OneMonumentComponent } from './one-monument/one-monument.component';
import { OneRestaurantComponent } from './one-restaurant/one-restaurant.component';
import { StoryComponent } from './story/story.component';



const routes: Routes = [
  { path: "accueil", component: AccueilComponent },
  { path: "", component: SigninComponent },
  { path: "login", component: SigninComponent },
  { path: "profile/:id", component: UserProfileComponent },
  { path: 'restaurants', component: AllRestaurantComponent },
  { path: 'histoire' , component: StoryComponent },
  { path: 'restaurants/:id', component: OneRestaurantComponent},
  { path: 'monuments', component: AllMonumentsComponent },
  { path: "monuments/:id", component: OneMonumentComponent},
  {
    path: 'admin', component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      // USERS
      { path: 'user', component: UserComponent },
      // Monuments
      { path: 'monument', component: MonumentComponent },
      // restaurant
      { path: 'restaurant', component: RestaurantComponent },
    ]
  },
  { path: '404' , component: FourOhFourComponent},
  { path: '**' , redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
