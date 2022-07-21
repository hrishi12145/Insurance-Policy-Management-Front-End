import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Transaction } from 'src/app/model/transaction';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
})
export class TransactionListComponent implements OnInit {
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
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.findAllTransaction();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  findAllTransaction() {
    this.adminService.getAllTransactions().subscribe((data) => {
      this.transactionList = data;
      this.dataSource.data = data;
    });
  }
}
