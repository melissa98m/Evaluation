import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderTitleService } from '../services/header-title/header-title.service';
import { MonumentService } from '../services/monument/monument.service';
import { DeleteMonumentComponent } from './dialogs/delete/delete-monument.component';
import { NewMonumentComponent } from './dialogs/new/new-monument.component';
import { UpdateMonumentComponent } from './dialogs/update/update-monument.component';

@Component({
  selector: 'app-monument',
  templateUrl: './monument.component.html',
  styleUrls: ['./monument.component.css']
})
export class MonumentComponent implements OnInit {

  monuments:any;
  displayedColumns = ['id', 'name','image','options'];
  oneMon:any;
  orgaLength?:number;
  isLoading = false;
  err:any;
  newDialogRef?: MatDialogRef<NewMonumentComponent>;
  updateDialogRef?: MatDialogRef<UpdateMonumentComponent>;
  deleteDialogRef?: MatDialogRef<DeleteMonumentComponent>;

  constructor(
    private monumentsService: MonumentService,
    public headerTitleService: HeaderTitleService,
    public router: Router,
    public dialog: MatDialog,
    ) {
    this.headerTitleService.setTitle('Listes des Monuments');
  }

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  loadData() {

    this.monumentsService.getAllMonuments().subscribe((res) => {
      this.isLoading = true;
      this.monuments = res;
      this.monuments = new MatTableDataSource(this.monuments);
      this.monuments.paginator = this.paginator;
      this.orgaLength = this.monuments.data.length;
      this.isLoading = false;
    });

  }

  refreshTable(){
    this.paginator?._changePageSize(this.paginator?.pageSize);
  }

  // Open a dialog that processes the Monument POST (new)
  newDialog(){
    this.newDialogRef = this.dialog.open(NewMonumentComponent,{disableClose: true });
    this.newDialogRef.componentInstance.errorSend.subscribe(result => {
      this.isLoading = true;
      if ( result === 'none' ) {

        this.newDialogRef?.componentInstance.returnedMonument.subscribe(id => {

          this.monumentsService.getOneMonument(id).subscribe( final => {

            this.newDialogRef?.componentInstance.closeDialog()
            this.newDialogRef?.afterClosed().subscribe( result => {

              this.monuments.data.push(final);
              this.orgaLength = this.monuments.data.length;
              this.refreshTable()
              this.isLoading = false;

            })
          })
        })
      }
      }
    )
  }

  // Open a dialog that processes the Monument PUT
  updateDialog(id:number, name:string ){
    this.oneMon = [id, name]
    this.updateDialogRef = this.dialog.open(UpdateMonumentComponent, {
      data: {
        id : id,
        name : name,
      },disableClose: true
    })
    this.updateDialogRef?.componentInstance.errorSend.subscribe(result => {
      this.isLoading = true;
      if (result === 'none'){
        this.updateDialogRef?.componentInstance.closeDialog()
        this.updateDialogRef?.afterClosed().subscribe( result => {
          const foundIndex = this.monuments.data.findIndex((x: { id: any; }) => x.id === id);
          this.monuments.data[foundIndex] = this.monumentsService.dataChange.value;
          this.refreshTable();
          this.isLoading = false;
        });
      }
    })
  }

  // Open a dialog that processes the Monument DELETE
  deleteDialog(id:number, name:string){
    this.oneMon = [id, name]
    this.deleteDialogRef = this.dialog.open(DeleteMonumentComponent, {
      data: {
        id : id,
        name : name
      }
    })
    this.deleteDialogRef?.componentInstance.errorSend.subscribe(result => {
      this.isLoading = true;
      if (result === 'none'){
        this.deleteDialogRef?.componentInstance.closeDialog()
        this.deleteDialogRef?.afterClosed().subscribe( result => {
          const foundIndex = this.monuments.data.findIndex((x: { id: any; }) => x.id === id);
          this.monuments.data.splice(foundIndex, 1);
          this.orgaLength = this.monuments.data.length;
          this.refreshTable()
          this.isLoading = false;
        });
      }
    })
  }

  ngOnInit(): void {
    this.loadData()
  }

}
