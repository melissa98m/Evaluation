import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderTitleService } from 'src/app/services/header-title/header-title.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-update-Restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['./update-restaurant.component.css']
})
export class UpdateRestaurantComponent implements OnInit {

  @Output() errorSend = new EventEmitter<any>();
  updateRestaurantForm: FormGroup;
  err: any;
  oneRes: any;
  id: any;
  isLoading?:boolean;
  selectedFile?:File;

  constructor(
    public restaurantService: RestaurantService,
    public headerTitleService: HeaderTitleService,
    public router: Router,
    public fb: FormBuilder,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdateRestaurantComponent>
  ) {
    this.headerTitleService.setTitle('Editer un restaurant')
    this.oneRes = data;
    this.updateRestaurantForm = this.fb.group({
      name: ['', Validators.required],
      image: [''],
      chien: [''],
      specialite: ['']
    });
    this.updateRestaurantForm.get('name')?.setValue(data.name);
    this.updateRestaurantForm.get('image')?.setValue(data.image);
    this.updateRestaurantForm.get('specialite')?.setValue(data.specialite);
    this.updateRestaurantForm.get('chien')?.setValue(data.chien);
  }

  closeDialog() {
    this.dialogRef.close();
  }
  updateRestaurant() {
    this.isLoading = true;
    this.err = null;
    if(this.updateRestaurantForm.value.file){
      this.updateRestaurantForm.value.file = this.selectedFile;
    } else {
      this.updateRestaurantForm.value.file = "vide"
    }
    this.restaurantService.updateRestaurant(this.updateRestaurantForm.value, this.oneRes['id']).subscribe(
      data => {
        data = data,
          this.errorSend.emit('none'); // To send 'none' to parent
        this._snackBar.open("Vous avez mise à jour un restaurant !", 'fermer', { duration: 5000 })
      },
      err => {
        this.isLoading = false;
        this.errorSend.emit(err); // To send the error object to parent
        this.err = err
      }
    )
    this.router.navigate(['/admin/restaurant'])
  }

  ngOnInit(): void {
    this.isLoading = false;
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }
}
