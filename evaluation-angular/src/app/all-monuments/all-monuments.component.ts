import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { User } from '../class/user';
import { MonumentService } from '../services/monument/monument.service';
import { HeaderTitleService } from '../services/header-title/header-title.service';

import { UserService } from '../services/user/user.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchService } from '../services/search/search.service';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-all-monuments',
  templateUrl: './all-monuments.component.html',
  styleUrls: ['./all-monuments.component.css']
})
export class AllMonumentsComponent implements OnInit {

  isLoading = false;
  err:any;
  user:any = [];
  monuments:any=[]
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

  constructor(public monumentService: MonumentService,
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
    this.headerTitleService.setTitle("Tous les monuments");
    //recupere tous les monument
    this.monumentService.getAllMonuments().subscribe((res) => {
      this.isLoading = true;
      this.monuments = res;
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
    this.monuments=[]
    this.valueSearch = this.searchForm.value.search; // get the value of the input
    this.searchService.searchNavbar(this.searchForm.value).subscribe(
      res => {
        console.log(res)
        this.monuments=res.monument
      },
      error => {
        console.log(error);
      }
    )

  }
}

