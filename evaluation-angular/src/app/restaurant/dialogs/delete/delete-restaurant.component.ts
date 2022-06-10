import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete-restaurant.component.html',
  styleUrls: ['./delete-restaurant.component.css']
})
export class DeleteRestaurantComponent implements OnInit {

  @Output() errorSend = new EventEmitter<any>();
  oneCat: any;
  isLoading?:boolean;

  constructor(
    public restaurantService: RestaurantService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteRestaurantComponent>,
  ) { }

  // Delete a Restaurant
  deleteRestaurant(id: number) {
    this.isLoading = true;
    this.restaurantService.deleteRestaurant(id).subscribe(
      data => {
        this.errorSend.emit('none'); // To send 'none' to parent
        this._snackBar.open("Vous avez supprimé un restaurant  !", 'fermer', { duration: 5000 });
      },
      err => {
        this.isLoading = false;
        this.errorSend.emit(err); // To send the error object to parent
        console.log(err.status);
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.oneCat = this.data;
    this.isLoading = false;
  }

}