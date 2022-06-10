import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  searchForm: FormGroup;
  value?:string;

  constructor(
    public fb: FormBuilder,
    private searchService: SearchService
  ) {
    this.searchForm = this.fb.group({
      search: ['']
    })
  }

  newSearch() {
    this.value = this.searchForm.value.search; // get the value of the input
    this.searchService.searchNavbar(this.searchForm.value).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    )

  }


  ngOnInit(): void {
  }

}
