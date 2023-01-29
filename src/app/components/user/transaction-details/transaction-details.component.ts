import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';
import { Transaction } from 'src/app/model/transaction';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {
  userId: string;
  currentUser: User;
  transactionList: Array<Transaction>;
  dataSource: MatTableDataSource<Transaction> = new MatTableDataSource();
  displayedColumns: string[] = [
    'id',
    'firstName',
    'user',
    'policy',
    'price',
    'purchaseDate',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private userService: UserService,private route: ActivatedRoute) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit(): void {
    this.findUserTransaction();
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.userId = params.get('id');
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  findUserTransaction() {
    this.userService.getTransactionById(this.userId).subscribe((data) => {
      this.transactionList = data;
      this.dataSource.data = data;
    });
  }

}
