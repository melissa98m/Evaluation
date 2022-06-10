import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MonumentService } from 'src/app/services/monument/monument.service';

@Component({
  selector: 'app-new-mon',
  templateUrl: './new-monument.component.html',
  styleUrls: ['./new-monument.component.css']
})
export class NewMonumentComponent implements OnInit {

  @Output() errorSend = new EventEmitter<any>();
  @Output() returnedMonument = new EventEmitter<any>();

  newMonumentForm: FormGroup;
  err: any;
  isLoading=true;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public authService: AuthService,
    private _snackBar: MatSnackBar,
    public monumentService: MonumentService,
    public dialogRef: MatDialogRef<NewMonumentComponent>
  ) {

    this.newMonumentForm = this.fb.group({
      name: ['', Validators.required],
      image: ['']
    });
  }

  ngOnInit(): void {
    this.isLoading =false;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  // Get and set the value for color (based on "hex" value), POST the new Monument via the API
  newMonument() {
    this.isLoading = true;
    this.err = null;
    this.monumentService.newMonument(this.newMonumentForm.value).subscribe(
      data => {
          this.errorSend.emit('none'); // To send 'none' to parent
          this.returnedMonument.emit(data.data[0].id); // to send the id to parent
          this._snackBar.open("Vous avez créé un Monument !", 'fermer', { duration: 5000 });
      },
      err => {
        this.isLoading = false;
        this.errorSend.emit(err); // To send the error object to parent
        this.err = err // to send the error object to the template
      }
    );
  }

}
