import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { HeaderTitleService } from 'src/app/services/header-title/header-title.service';

@Component({
  selector: 'app-four-oh-four',
  templateUrl: './four-oh-four.component.html',
  styleUrls: ['./four-oh-four.component.css']
})
export class FourOhFourComponent implements OnInit {

  constructor(private router: Router , public headerTitleService: HeaderTitleService) {
    this.headerTitleService.setTitle('Page non trouvée')
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/'])
    } , 3000)
  }

}
