import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { User } from 'src/app/model/user';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  userList: Array<User>;
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'userName',
    'mobileNo',
    'city',
    'action',
  ];
  selectedUser: User = new User();
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
    this.findAllUsers();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  findAllUsers() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleUserSearch();
    } else {
      this.handleUsersList();
    }
  }
  handleUserSearch() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');
    this.adminService.searchUsers(theKeyword).subscribe((data) => {
      this.userList = data;
      this.dataSource.data = data;
    });
  }
  handleUsersList() {
    this.adminService.getAllUsers().subscribe((data) => {
      this.userList = data;
      this.dataSource.data = data;
    });
  }

  editUserRequest(user: User) {
    this.selectedUser = user;
    $('#userModal').modal('show');
  }

  updateUser() {
    this.adminService
      .updateUser(this.selectedUser.id, this.selectedUser)
      .subscribe((data) => {
        let itemIndex = this.userList.findIndex(
          (item) => item.id == this.selectedUser.id
        );
        this.userList[itemIndex] = this.selectedUser;
        this.dataSource = new MatTableDataSource(this.userList);
        this.infoMessage = ' User Details Updated Successfully....';
        $('#userModal').modal('hide');
      });
  }

  deleteUserRequest(user: User) {
    this.selectedUser = user;
    $('#deleteModal').modal('show');
  }

  deleteUser() {
    this.adminService.deleteUser(this.selectedUser.id).subscribe((data) => {
      let itemIndex = this.userList.findIndex(
        (item) => item.id == this.selectedUser.id
      );
      if (itemIndex !== -1) {
        this.userList.splice(itemIndex, 1);
      }
      this.dataSource = new MatTableDataSource(this.userList);
      this.infoMessage = ' User Deleted Successfully ........';
      $('#deleteModal').modal('hide');
    });
  }

  doSearch(value: string) {
    console.log(`value=${value}`);
    this.router.navigateByUrl(`/user-search/${value}`).then(() => {
      this.router.navigateByUrl(`/user-search/${value}`);
      window.location.reload();
    });
  }
}
