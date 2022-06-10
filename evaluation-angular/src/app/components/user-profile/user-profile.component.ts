import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { UserService } from 'src/app/services/user/user.service';
import {HeaderTitleService} from "../../services/header-title/header-title.service";
import {ModifyPasswordComponent} from "../../user/dialogs/modify-password/modify-password.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../../class/user";
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  id!: number;
  videos:any;
  currentUser: any;
  err:any;
  modifyPasswordDialogRef?: MatDialogRef<ModifyPasswordComponent>;
  categories: any;
  listed:any = [];
  user:any = [];
  breakpoint?: number;
  searchForm: FormGroup;

 constructor(
    private route: ActivatedRoute,
    public userService : UserService,
    private headerTitleService: HeaderTitleService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public fb: FormBuilder,
    ) {
      
        this.searchForm = this.fb.group({
          search: ['']
        })

        console.log(this.currentUser);
    
  }

  logData() {
    this.headerTitleService.setTitle("Mon Compte");
    // Get all catégories
  }

  logDataUser() {
    this.listed = []
    //recup le current user
    this.userService.currentUser().subscribe(
      data => {
        this.user = data;
        this.currentUser = data;
      },
      err => { this.err = err.status }
    );
  }

  // Open a dialog that processes the user POST (new)
  modifyPasswordDialog(id:number){
    this.modifyPasswordDialogRef = this.dialog.open(ModifyPasswordComponent, {
      disableClose: true,
      data: { id: id }
    });
    this.modifyPasswordDialogRef.componentInstance.errorSend.subscribe(result => {
      if ( result === 'none' ) {
        this.modifyPasswordDialogRef?.componentInstance.closeDialog()
        this.modifyPasswordDialogRef?.afterClosed().subscribe( result => {
          
        })
      }
    }, err => { this.err = err })
  }

  

  onResize(event: any) {
    if (window.innerWidth <= 426) {
      this.breakpoint = 1;
    } else {
      this.breakpoint = (window.innerWidth <= 1199) ? 2 : 3;
    }
  }

  ngOnInit(): void {
    if (window.innerWidth <= 426) {
      this.breakpoint = 1;
    } else {
      this.breakpoint = (window.innerWidth <= 1199) ? 2 : 3;
    }
    this.logDataUser()
    this.logData();
  }
}
