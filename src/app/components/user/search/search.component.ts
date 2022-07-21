import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}
  public newTask: string = '';
  ngOnInit(): void {
    this.doSearch;
  }

  doSearch(value: string) {
    console.log(`value=${value}`);
    this.router.navigateByUrl(`/search/${value}`).then(() => {
      this.router.navigateByUrl(`/search/${value}`);
      window.location.reload();
    });
  }
}
