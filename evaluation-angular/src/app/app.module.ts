import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe, JsonPipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SigninComponent } from './components/signin/signin.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthInterceptor } from './interceptor/auth-interceptor';
import { AdminComponent } from './admin/admin.component';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { NewUserComponent } from './user/dialogs/new/new-user.component';
import { UserComponent } from './user/user.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatColorFormats, MAT_COLOR_FORMATS, NgxMatColorPickerModule } from '@angular-material-components/color-picker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatInputModule } from '@angular/material/input';

import { MonumentService } from './services/monument/monument.service';
import { DeleteMonumentComponent } from './monument/dialogs/delete/delete-monument.component';
import { UpdateMonumentComponent } from './monument/dialogs/update/update-monument.component';
import { NewMonumentComponent } from './monument/dialogs/new/new-monument.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { NewRestaurantComponent } from './restaurant/dialogs/new/new-restaurant.component';
import { UpdateRestaurantComponent } from './restaurant/dialogs/update/update-restaurant.component';
import { DeleteRestaurantComponent } from './restaurant/dialogs/delete/delete-restaurant.component';
import { ModifyPasswordComponent } from './user/dialogs/modify-password/modify-password.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';
import { DeleteUserComponent } from './user/dialogs/delete/delete-user.component';
import { UpdateUserComponent } from './user/dialogs/update/update-user.component';
import { MonumentComponent } from './monument/monument.component';
import { AllRestaurantComponent } from './all-restaurant/all-restaurants.component';
import { AllMonumentsComponent } from './all-monuments/all-monuments.component';
import { OneMonumentComponent } from './one-monument/one-monument.component';
import { OneRestaurantComponent } from './one-restaurant/one-restaurant.component';
import { StoryComponent } from './story/story.component';


export const NGX_MAT_COLOR_FORMATS: MatColorFormats = {
  display: {
    colorInput: 'hex'
  }
}

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    FooterComponent,
    HeaderComponent,
    SigninComponent,
    AdminComponent,
    UserComponent,
    MonumentComponent,
    DeleteMonumentComponent,
    UpdateMonumentComponent,
    NewMonumentComponent,
    RestaurantComponent,
    NewRestaurantComponent,
    UpdateRestaurantComponent,
    DeleteRestaurantComponent,
    NewUserComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    ModifyPasswordComponent,
    UserProfileComponent,
    SearchBarComponent,
    FourOhFourComponent,
    AllRestaurantComponent,
    AllMonumentsComponent,
    OneMonumentComponent,
    OneRestaurantComponent,
    StoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatBadgeModule,
    MatSlideToggleModule,
    MatCardModule,
    MatListModule,
    HttpClientModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    NgxMatColorPickerModule,
    MatSnackBarModule,
    MatGridListModule,
    MatDialogModule,
    MatSelectModule,
    MatMenuModule,
    MaterialFileInputModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    JsonPipe, MatDatepickerModule, Title, MonumentService, DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
