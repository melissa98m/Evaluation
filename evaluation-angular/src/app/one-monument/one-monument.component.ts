import { Component, OnInit } from '@angular/core';
import { HeaderTitleService } from '../services/header-title/header-title.service';
import { ActivatedRoute , Router } from '@angular/router';
import { MonumentService } from '../services/monument/monument.service';

@Component({
  selector: 'app-one-monument',
  templateUrl: './one-monument.component.html',
  styleUrls: ['./one-monument.component.css']
})
export class OneMonumentComponent implements OnInit {


 
  isLoading = false;
  oneMonument: any;
  id!: number;
  err:any;
  listed:any = [];

  constructor(
    private route: ActivatedRoute,
    public monumentService : MonumentService,
    private headerTitleService: HeaderTitleService,
  ) { 
    this.monumentService.getOneMonument(this.oneMonument.id).subscribe(
      data => { this.oneMonument = data },
      error => { console.log(error.status) }
    );
    

  }
  
  ngOnInit(): void {
    this.loadData();
    console.log(this.oneMonument);
  }
  //recupere le monument
  getOneMonument(){
    this.monumentService.getOneMonument(this.id).subscribe((res) => {
      this.oneMonument = res;
      this.headerTitleService.setTitle(this.oneMonument.name)
    });
  }

  loadData() {
   
    //recupere le monument
   this.getOneMonument()
  }


  }


  


