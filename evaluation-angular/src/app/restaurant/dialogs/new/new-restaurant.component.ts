import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-new',
  templateUrl: './new-restaurant.component.html',
  styleUrls: ['./new-restaurant.component.css']
})
export class NewRestaurantComponent implements OnInit {
  
  @Output() errorSend = new EventEmitter<any>();
  @Output() returnedRestaurant = new EventEmitter<any>();
  newRestaurantForm: FormGroup;
  err:any;
  isLoading?:boolean;
  selectedFile?:File;
  
  constructor( public fb: FormBuilder,
    public router: Router,
    public authService: AuthService,
    private _snackBar: MatSnackBar,
    public restaurantService: RestaurantService ,
    public dialogRef: MatDialogRef<NewRestaurantComponent>) {
      
      this.newRestaurantForm = this.fb.group({
        name: ['', Validators.required],
        specialite: [''],
        chien: [''],
        image: ['']     
      });
     }

  ngOnInit(): void {
    this.isLoading = false;
  }
  closeDialog() {
    this.dialogRef.close();
  }

// POST the new Restaurant via the API
  newRestaurant() {
    this.isLoading = true;
    this.err = null;
   
      this.newRestaurantForm.value.file = this.selectedFile;  
      this.restaurantService.newRestaurant(this.newRestaurantForm.value).subscribe(
        data => { data = data 
          this.errorSend.emit('none'); // To send 'none' to parent
          this.returnedRestaurant.emit(data.data[0].id);
          this._snackBar.open("Vous avez créé un restaurant !", 'fermer', {duration : 5000}); 
          }, // not used anywhere
        err => { 
          this.isLoading = false;
          this.errorSend.emit(err); // To send the error object to parent
          this.err = err // to send the error object to the template}
        },
      );    
  }
}


