
import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { UserService } from '../services/user/user.service';
import { MonumentService } from '../services/monument/monument.service';
import { RestaurantService } from '../services/restaurant/restaurant.service';
import { HeaderTitleService } from '../services/header-title/header-title.service';
import { ModifyPasswordComponent } from '../user/dialogs/modify-password/modify-password.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from '../class/user';
import { Restaurant } from '../class/organisme';
import {MatSnackBar} from "@angular/material/snack-bar";
import { JWTTokenService } from '../services/JWT/jwttoken.service';
import { AuthService } from '../services/auth/auth.service';



@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  monuments: any;
  restaurants: any;
  user: any = [];
  isLoading = false;
  err: any;
  breakpoint?: number;
  logged: any;
 

  constructor(
    private headerTitleService: HeaderTitleService,
    public userService: UserService,
    public MonumentService: MonumentService,
    public RestaurantService: RestaurantService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public token: JWTTokenService,
    public UserService: UserService,
    public authService: AuthService,
  ) {
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

 


  logData() {
    this.isLoading = true;
    this.headerTitleService.setTitle("Accueil")
    // Get all catégories
    this.MonumentService.getAllMonuments().subscribe(
      data => {
        this.monuments = data
      },
      err => {
        this.err = err.status
      }
    );
    // Get all vidéos
    this.RestaurantService.getAllRestaurants().subscribe(
      data => {
        this.restaurants = data;
        this.logDataUser();
      },
      err => {
        this.err = err.status
      }
    );
  }

  //recupère l'utilisateur connecter
  logDataUser() {
    this.userService.currentUser().subscribe(
      data => {
        this.user = data;
        this.isLoading = false;
      },
      err => {
        this.err = err.status
      }
    );
  }
  onResize(event: any) {
    if (window.innerWidth <= 426) {
      this.breakpoint = 1;
    } else if (window.innerWidth <= 560) {
      this.breakpoint = 2;
    } else {
      this.breakpoint = (window.innerWidth <= 959) ? 3 : 5;
    }
  }

  ngOnInit(): void {
    if (window.innerWidth <= 426) {
      this.breakpoint = 1;
    } else if (window.innerWidth <= 560) {
      this.breakpoint = 2;
    } else {
      this.breakpoint = (window.innerWidth <= 959) ? 3 : 5;
    }
    this.token.setToken(this.authService.getToken());
    if (localStorage.getItem('access_token')) {
      this.token.isTokenExpired();
      this.logged = true;
      this.userService.currentUser().subscribe(
        data => { this.user = data },
        err => { err.status }
      );
    }
    this.logData();
  }
}
