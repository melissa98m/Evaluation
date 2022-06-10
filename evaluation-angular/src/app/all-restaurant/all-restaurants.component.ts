import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { User } from '../class/user';
import { RestaurantService } from '../services/restaurant/restaurant.service';
import { HeaderTitleService } from '../services/header-title/header-title.service';

import { UserService } from '../services/user/user.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchService } from '../services/search/search.service';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-all-restaurants',
  templateUrl: './all-restaurants.component.html',
  styleUrls: ['./all-restaurants.component.css']
})
export class AllRestaurantComponent implements OnInit {

  isLoading = false;
  err:any;
  user:any = [];
  restaurants:any=[]
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  storeVideo:any=[]
  recherche:string=''
  listed:any = [];
  pageIndex:number = 0;
  pageSize:number = 4;
  lowValue:number = 0;
  highValue:number = 4;
  searchForm: FormGroup;
  valueSearch?:string;

  constructor(public RestaurantService: RestaurantService,
    public userService: UserService,
    private headerTitleService: HeaderTitleService,
    private _snackBar: MatSnackBar,
    public fb: FormBuilder,
    private searchService: SearchService,
    public dialog: MatDialog
  ) {
    this.searchForm = this.fb.group({
      search: ['']
    })
  }

  logData() {
    this.isLoading = true;
    this.headerTitleService.setTitle("Tous les restaurants");
    //recupere tous les restaurant
    this.RestaurantService.getAllRestaurants().subscribe((res) => {
      this.isLoading = true;
      this.restaurants = res;
      this.isLoading = false;
    });

  }

  logDataUser() {
    this.listed = []
    //recup le current user
    this.userService.currentUser().subscribe(
      data => {
        this.user = data;
        this.isLoading = false;
      },
      err => { this.err = err.status }
    );
  }

  ngOnInit(): void {
    this.logData();
  }


  getPaginatorData(event:any){
  if(event.pageIndex === this.pageIndex + 1){
    this.lowValue = this.lowValue + this.pageSize;
    this.highValue =  this.highValue + this.pageSize;
  }
  else if(event.pageIndex === this.pageIndex - 1){
    this.lowValue = this.lowValue - this.pageSize;
    this.highValue =  this.highValue - this.pageSize;
  }
  this.pageIndex = event.pageIndex;
  }

  newSearch() {
    this.restaurants=[]
    this.valueSearch = this.searchForm.value.search; // get the value of the input
    this.searchService.searchNavbar(this.searchForm.value).subscribe(
      res => {
        console.log(res)
        this.restaurants=res.restaurant
      },
      error => {
        console.log(error);
      }
    )

  }
}

