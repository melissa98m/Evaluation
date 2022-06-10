import { Component, OnInit } from '@angular/core';
import { HeaderTitleService } from '../services/header-title/header-title.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  constructor(private headerTitleService: HeaderTitleService) { 
    this.headerTitleService.setTitle("L'histoire de Grenoble");
  }

  ngOnInit(): void {
  }

}
