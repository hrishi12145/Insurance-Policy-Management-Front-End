import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';
import { Policy } from 'src/app/model/policy';
import { Transaction } from 'src/app/model/transaction';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  policyList: Array<Policy>;
  dataSource: MatTableDataSource<Policy> = new MatTableDataSource();
  obs: Observable<any>;
  errorMessage: string;
  infoMessage: string;
  currentUser: User;
  searchMode: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit(): void {
    this.getAllPolicies();
    this.obs = this.dataSource.connect();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
  getAllPolicies() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchPolicies();
    } else {
      this.handleListPolicies();
    }
  }
  handleSearchPolicies() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');
    this.userService.searchPolicies(theKeyword).subscribe((data) => {
      this.policyList = data;
      this.dataSource.data = data;
    });
  }
  handleListPolicies() {
    this.userService.getAllPolicies().subscribe((data) => {
      this.policyList = data;
      this.dataSource.data = data;
    });
  }
  purchasePolicy(policy: Policy) {
    if (!this.currentUser) {
      this.errorMessage = ' You should sign in to purchase a Policy';
      return;
    }
    this.router.navigate(['/buy']);
    var transaction = new Transaction();
    transaction.policy = policy;
    transaction.user = this.currentUser;
    this.userService.purchasePolicy(transaction).subscribe((data) => {
      this.infoMessage = ' Policy purchased Successfully.';
    });
  }
  detail(policy: Policy) {
    localStorage.setItem('currentPolicy', JSON.stringify(policy));
    this.router.navigate(['/detail', policy.id]);
  }
}
