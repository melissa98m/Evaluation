import { RestaurantService } from './../services/restaurant/restaurant.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderTitleService } from '../services/header-title/header-title.service';

@Component({
  selector: 'app-one-restaurant',
  templateUrl: './one-restaurant.component.html',
  styleUrls: ['./one-restaurant.component.css']
})
export class OneRestaurantComponent implements OnInit {

  
  isLoading = false;
  oneRestaurant: any;
  id!: number;
  err:any;
  listed:any = [];

  constructor(
    private route: ActivatedRoute,
    private RestaurantService : RestaurantService,
    private headerTitleService: HeaderTitleService
  ) { 
      //recupere le Restaurant
      
       
    
  }

  ngOnInit(): void {
   this.loadData()
  }

    //recupere le Restaurant
    getOneRestaurant(){
      this.RestaurantService.getOneRestaurant(this.id).subscribe((res) => {
        this.oneRestaurant = res;
        this.headerTitleService.setTitle(this.oneRestaurant.name)
      });
    }

    loadData() {
      this.RestaurantService.getOneRestaurant(this.id).subscribe((res) => {
        this.oneRestaurant = res;
        this.headerTitleService.setTitle(this.oneRestaurant.name)
      });
     
      console.log(this.oneRestaurant.id)
    }
  
    //recupere la video
    getRestaurant(){
      this.RestaurantService.getOneRestaurant(this.id).subscribe((res) => {
        this.oneRestaurant = res;
        this.headerTitleService.setTitle(this.oneRestaurant.title)
        this.isLoading = false;
      });
    }
  

}
