import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Admin } from 'src/app/model/admin';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css'],
})
export class AdminListComponent implements OnInit {
  userList: Array<Admin>;
  dataSource: MatTableDataSource<Admin> = new MatTableDataSource();
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'userName',
    'mobileNo',
    'city',
    'action',
  ];
  selectedUser: Admin = new Admin();
  errorMessage: string;
  infoMessage: string;
  searchMode: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.findAllAdmins();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  findAllAdmins() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleAdminSearch();
    } else {
      this.handleAdminsList();
    }
  }
  handleAdminSearch() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');
    this.adminService.searchAdmin(theKeyword).subscribe((data) => {
      this.userList = data;
      this.dataSource.data = data;
    });
  }
  handleAdminsList() {
    this.adminService.getAllAdmins().subscribe((data) => {
      this.userList = data;
      this.dataSource.data = data;
    });
  }
  editUserRequest(user: Admin) {
    this.selectedUser = user;
    $('#userModal').modal('show');
  }
  updateAdmin() {
    this.adminService
      .updateAdmin(this.selectedUser.id, this.selectedUser)
      .subscribe((data) => {
        let itemIndex = this.userList.findIndex(
          (item) => item.id == this.selectedUser.id
        );
        this.userList[itemIndex] = this.selectedUser;
        this.dataSource = new MatTableDataSource(this.userList);
        this.infoMessage = ' Admin Details Updated Successfully....';
        $('#userModal').modal('hide');
      });
  }
  deleteUserRequest(user: Admin) {
    this.selectedUser = user;
    $('#deleteModal').modal('show');
  }

  deleteAdmin() {
    this.adminService.deleteAdmin(this.selectedUser.id).subscribe((data) => {
      let itemIndex = this.userList.findIndex(
        (item) => item.id == this.selectedUser.id
      );
      if (itemIndex !== -1) {
        this.userList.splice(itemIndex, 1);
      }
      this.dataSource = new MatTableDataSource(this.userList);
      this.infoMessage = ' Admin Deleted Successfully ........';
      $('#deleteModal').modal('hide');
    });
  }

  doSearch(value: string) {
    console.log(`value=${value}`);
    this.router.navigateByUrl(`/admin-search/${value}`).then(() => {
      this.router.navigateByUrl(`/admin-search/${value}`);
      window.location.reload();
    });
  }
}
