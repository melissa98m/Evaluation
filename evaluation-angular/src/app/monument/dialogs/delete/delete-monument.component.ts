import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MonumentService } from 'src/app/services/monument/monument.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete-monument.component.html',
  styleUrls: ['./delete-monument.component.css']
})
export class DeleteMonumentComponent implements OnInit {

  @Output() errorSend = new EventEmitter<any>();
  oneMon:any;
  isLoading?:boolean;
  constructor(
    public monumentsService: MonumentService,
    @Inject (MAT_DIALOG_DATA)  public data: any,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteMonumentComponent>
  ) 
  { }

  closeDialog() {
    this.dialogRef.close();
  }
  
  // Delete an Monument
  deleteMonument(id:number){
    this.isLoading = true;
    this.monumentsService.deleteMonument(id).subscribe(
      data => { 
        data = data,
        this.errorSend.emit('none'); // To send 'none' to parent
        this._snackBar.open("Vous avez supprimé un Monument !", 'fermer', {duration : 5000});
       },
      err => { 
        this.isLoading = false;
        this.errorSend.emit(err); // To send the error object to parent
        console.log(err.status)
      }
    );
  }

  ngOnInit(): void {
    this.oneMon = this.data;
    this.isLoading = false;
  }

}
