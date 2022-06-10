import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant/restaurant.service';
import { HeaderTitleService } from '../services/header-title/header-title.service';
import { DeleteRestaurantComponent } from './dialogs/delete/delete-restaurant.component';
import { NewRestaurantComponent } from './dialogs/new/new-restaurant.component';
import { UpdateRestaurantComponent } from './dialogs/update/update-restaurant.component';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  displayedColumns = ['id', 'name','image','options'];
  restaurants: any;
  oneRes: any;
  CateLength?: number;
  isLoading = false;
  newDialogRef?: MatDialogRef<NewRestaurantComponent>;
  updateDialogRef?: MatDialogRef<UpdateRestaurantComponent>;
  deleteDialogRef?: MatDialogRef<DeleteRestaurantComponent>;

  constructor(private headerTitleService: HeaderTitleService,
    public restaurantService: RestaurantService,
    public router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) {

    this.headerTitleService.setTitle("Liste des restaurants");

  }
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  loadData() {
    // Get all restaurant

    this.restaurantService.getAllRestaurants().subscribe((res) => {
      this.isLoading = true;
      this.restaurants = res;
      this.restaurants = new MatTableDataSource(this.restaurants);
      this.restaurants.paginator = this.paginator;
      this.CateLength = this.restaurants.data.length
      this.isLoading = false;
    });

  }

  refreshTable() {
    this.paginator?._changePageSize(this.paginator?.pageSize);
  }

  deleteDialog(id: number, name: string) {
    this.oneRes = [id, name]
    this.deleteDialogRef = this.dialog.open(DeleteRestaurantComponent, {
      data: {
        id: id,
        name: name
      }
    })
    this.deleteDialogRef?.componentInstance.errorSend.subscribe(result => {
      this.isLoading = true;
      if (result === 'none') {
        this.deleteDialogRef?.componentInstance.closeDialog()
        this.deleteDialogRef?.afterClosed().subscribe(result => {
          const foundIndex = this.restaurants.data.findIndex((x: { id: any; }) => x.id === id);
          this.restaurants.data.splice(foundIndex, 1);
          this.CateLength = this.restaurants.data.length;
          this.refreshTable();
          this.isLoading = false;
        });
      }
    })
  }
  updateDialog(id: number, name: string) {
    this.oneRes = [id, name]
    this.updateDialogRef = this.dialog.open(UpdateRestaurantComponent, {
      data: {
        id: id,
        name: name,
      },disableClose: true
    })
    this.updateDialogRef?.componentInstance.errorSend.subscribe(result => {
      this.isLoading = true;
      if (result === 'none') {
        this.updateDialogRef?.componentInstance.closeDialog()
        this.updateDialogRef?.afterClosed().subscribe(result => {
          const foundIndex = this.restaurants.data.findIndex((x: { id: any; }) => x.id === id);
          this.restaurants.data[foundIndex] = this.restaurantService.dataChange.value;
          this.refreshTable();
          this.isLoading = false;
        });
      }
    })
  }


  newDialog(){
    this.newDialogRef = this.dialog.open(NewRestaurantComponent,{disableClose: true });
    this.newDialogRef.componentInstance.errorSend.subscribe(result => {
      this.isLoading = true;
      if ( result === 'none' ) {
        this.newDialogRef?.componentInstance.returnedRestaurant.subscribe(id => {

          this.restaurantService.getOneRestaurant(id).subscribe( final => {

            this.newDialogRef?.componentInstance.closeDialog()
            this.newDialogRef?.afterClosed().subscribe( result => {

              this.restaurants.data.push(final);
              this.CateLength = this.restaurants.data.length;
              this.refreshTable()
              this.isLoading = false;

            })
          })
        })
      }
    })
  }


  ngOnInit(): void {
    this.loadData();
  }

}
