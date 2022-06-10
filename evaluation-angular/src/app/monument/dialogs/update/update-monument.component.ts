import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MonumentService } from 'src/app/services/monument/monument.service';

@Component({
  selector: 'app-update',
  templateUrl: './update-monument.component.html',
  styleUrls: ['./update-monument.component.css']
})
export class UpdateMonumentComponent implements OnInit {

  @Output() errorSend = new EventEmitter<any>();
  updateMonumentForm: FormGroup;
  err:any;
  oneMon:any;
  isLoading?:boolean;

  constructor(
    public monumentService: MonumentService, 
    public router: Router,
    public fb: FormBuilder,
    private _snackBar: MatSnackBar,
    @Inject (MAT_DIALOG_DATA)  public data: any,
    public dialogRef: MatDialogRef<UpdateMonumentComponent>
  ) { 
    this.updateMonumentForm = this.fb.group({
      name: ['', Validators.required],
      image: [''],
    });
    this.updateMonumentForm.get('name')?.setValue(data.name);
    this.updateMonumentForm.get('image')?.setValue(data.image);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  updateMonument(){
    this.isLoading = true;
    this.err = null; 
    this.monumentService.updateMonument(this.updateMonumentForm.value, this.data['id']).subscribe(
      data => { 
        data = data,
        this.errorSend.emit('none'); // To send 'none' to parent
        this._snackBar.open("Vous avez mise à jour un Monument !", 'fermer', {duration : 5000})
      }, 
      err => { 
        this.isLoading = false;
        this.errorSend.emit(err); // To send the error object to parent
        this.err = err
       }
    );
  }

  ngOnInit(): void {
    this.isLoading = false;
  }

}
