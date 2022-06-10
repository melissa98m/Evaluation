import { analyzeAndValidateNgModules } from '@angular/compiler';
import { isDefined } from '@angular/compiler/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth/auth.service';
import { HeaderTitleService } from '../services/header-title/header-title.service';
import { ThemeModeService } from '../services/theme-mode/theme-mode.service';
import { UserService } from '../services/user/user.service';
import { JWTTokenService } from "../services/JWT/jwttoken.service";
import { Location } from '@angular/common';
import { RestaurantService } from "../services/restaurant/restaurant.service";
import { MonumentService } from "../services/monument/monument.service";
import { MatDialog } from '@angular/material/dialog';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any = [];
  title: string = "";
  isDark: any = undefined;
  checked: any;
  logged: any;
  restaurants: any;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private headerTitleService: HeaderTitleService,
    public themeMode: ThemeModeService,
    public token: JWTTokenService,
    private location: Location,
    private restaurantService: RestaurantService,
    private MonumentService: MonumentService,
    private dialog: MatDialog
  ) {

    // Update the title dynamically
    this.headerTitleService.title.subscribe(updatedTitle => {
      this.title = updatedTitle;
    });

    this.restaurantService.getAllRestaurants().subscribe(
      data => { this.restaurants = data },
      err => { err.status }
    )
    this.MonumentService.getAllMonuments().subscribe(
      data => { this.restaurants = data },
      err => { err.status }
    )


    this.authService.errorSend.subscribe(
      data => {
        if (data === 'none') {
          this.logged = true
          this.userService.currentUser().subscribe(
            data => { this.user = data },
            err => { err.status }
          );
        }
      }
    )

  }

  // ouvre la boite de dialogs pour la recherche dans la nav
  openSearch() {
    this.dialog.open(SearchBarComponent);
  }

  logout() {
    this.authService.doLogout()
    this.logged = false;
  }

  ngOnInit(): void {
    this.themeMode.themeSlideChecked();
    this.checked = this.themeMode.getSlideChecked();
    this.token.setToken(this.authService.getToken());
    if (localStorage.getItem('access_token')) {
      this.token.isTokenExpired();
      this.logged = true;
      this.userService.currentUser().subscribe(
        data => { this.user = data },
        err => { err.status }
      );
    }
  }

  onSwitch() {
    this.themeMode.onSwitch();
  }

  back() {
    this.location.back();
  }
}
